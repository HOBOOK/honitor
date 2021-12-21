<template>
  <v-card class="canvas-wrap" :height="300 +'px'" :width="600 +'px'">
    <div id="canvas" class="ma-0" @click="$emit('click')">
      <span class="canvas-caption"><span class="caption-text"></span></span>
    </div>
  </v-card>
</template>
<script>
import * as THREE from 'three'

export default {
  name: 'MySymbol',
  props:{
    height:{
      type:Number
    },
    width:{
      type:Number
    },
    title:{
      type:String
    },
    particles:{
      type: Number,
      default: 500
    },
    animateSpeed:{
      type: Number,
      default: 0.005
    },
    color:{
      type:String,
      default: 'rgb(200,200,200)'
    }
  },
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      mouse:null,
      selectedObject :null,

      circle:null,
      lights:null,
      ambientLight:null,
      canvasDom:null,
      mouseY : 0,
      line:null,
      parameters:null
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  watch:{
    particles() {
      this.init()
      this.animate()
    }
  },
  methods: {
    init() {
      
      this.camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 3000 );
      this.camera.position.z = 850;

      this.scene = new THREE.Scene();

      // const parameters = [[ 0.25, "rgb(123,123,123)", 1 ], [ 0.5, "rgb(123,123,123)", 1 ], [ 0.75, "rgb(123,123,123)", 0.75 ], [ 1, "rgb(123,123,123)", 0.5 ], [ 1.25, "rgb(123,123,123)", 0.8 ],
			// 		[ 3.0, "rgb(123,123,123)", 0.75 ], [ 3.5, "rgb(123,123,123)", 0.5 ], [ 4.5, "rgb(123,123,123)", 0.25 ], [ 5.5, "rgb(123,123,123)", 0.125 ]];
      this.parameters = [[ 1, "rgb(123,123,123)", 1 ], [ 1, "rgb(123,123,123)", 1 ], [ 1.25, "rgb(123,123,123)", 0.9 ], [ 1, "rgb(123,123,123)", 0.5 ], [ 1.25, "rgb(123,123,123)", 0.8 ],
					[ 3.0, "rgb(123,123,123)", 0.75 ]];
      const geometry = this.createGeometry();

      for ( let i = 0; i < this.parameters.length; ++ i ) {

        const p = this.parameters[ i ];

        const material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ], shading:THREE.DoublesSide } );

        this.line = new THREE.LineSegments( geometry, material );

        this.line.updateMatrix();

      }

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
      this.renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.autoClear = false;
      this.renderer.setClearColor(0x000000, 0.0);

      this.canvasDom = document.getElementById('canvas')
      this.canvasDom.appendChild(this.renderer.domElement);

      var circleGeom = new THREE.TetrahedronGeometry(32,0)
      var circleMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(this.color),
        shading: THREE.FlatShading,
        wireframe: true,
      });

      this.ambientLight = new THREE.AmbientLight(this.color );
      this.scene.add(this.ambientLight);

      this.lights = [];
      this.lights[0] = new THREE.DirectionalLight( this.color, 1 );
      this.lights[0].position.set( 1, 0, 0 );
      this.lights[1] = new THREE.DirectionalLight( this.color, 1 );
      this.lights[1].position.set( 0.75, 1, 0.5 );
      this.lights[2] = new THREE.DirectionalLight( this.color, 1 );
      this.lights[2].position.set( -0.75, -1, 0.5 );
      this.scene.add( this.lights[0], this.lights[1], this.lights[2] );

      this.circle = new THREE.Mesh(circleGeom, circleMat);
      this.circle.scale.x = this.circle.scale.y = this.circle.scale.z = 17;

      this.scene.add(this.circle, this.line)

      //document.addEventListener( 'mousemove', this.onDocumentMouseDown, false );
      document.addEventListener( 'mousedown', this.onDocumentClick, false );
      window.addEventListener( 'resize', this.onWindowResize, false );
      document.body.addEventListener( 'pointermove', this.onPointerMove );
      
      this.mouse = new THREE.Vector2();
      this.raycaster =  new THREE.Raycaster();
    },

    createGeometry(){
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      const vertex = new THREE.Vector3();

      for ( let i = 0; i < 300; i ++ ) {

        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.normalize();
        vertex.multiplyScalar( this.particles );

        vertices.push( vertex.x, vertex.y, vertex.z );

        vertex.multiplyScalar( Math.random() * 0.09 + 1 );

        vertices.push( vertex.x, vertex.y, vertex.z );

      }

      geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

      return geometry;
    },

    animate() {
      requestAnimationFrame(this.animate)
      //this.camera.position.y += ( - this.mouseY + 100 - this.camera.position.y ) * .05;
			this.camera.lookAt( this.scene.position );

      const time = Date.now() * 0.00009;

      for ( let i = 0; i < this.scene.children.length; i ++ ) {
        const object = this.scene.children[ i ];
        if ( object.isLine ) {
          object.rotation.y = time * ( i < 4 ? ( i + 1 ) : - ( i + 1 ) );
          if ( i < 5 ) {
            const scale = object.userData.originalScale * ( i / 5 + 1 ) * ( 1 + 0.5 * Math.sin( 7 * time ) );
            object.scale.x = object.scale.y = object.scale.z = scale;
          }

        }

      }
      this.circle.rotation.x -= this.animateSpeed;
      this.circle.rotation.y -= this.animateSpeed;
      this.renderer.clear();
      this.renderer.render( this.scene, this.camera );
      
    },

    onPointerMove(event){
      let windowHalfY = window.innerHeight / 2
      if ( event.isPrimary === false ) return;

			this.mouseY = event.clientY - windowHalfY;
    },
    onDocumentMouseDown(event){     
       event.preventDefault()
        if(this.selectedObject ){
          this.lights[0].color.set(this.color)
          this.lights[1].color.set(this.color)
          this.lights[2].color.set(this.color)
          this.ambientLight.color.set(this.color)
				  this.selectedObject = null;
          document.body.style.cursor = 'default'

          this.line.scale.x = this.line.scale.y = this.line.scale.z = 1;
        }

        this.mouse.x = ( event.offsetX / this.canvasDom.clientWidth ) * 2 - 1;
	      this.mouse.y = - (event.offsetY / this.canvasDom.clientHeight ) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera)

        var intersects = this.raycaster.intersectObjects( this.scene.children );

        if(intersects.length > 0){
          const res = intersects.filter( function ( res ) {

					return res && res.object;

          } )[ 0 ];

          if ( res && res.object ) {
            this.selectedObject = res.object;
            this.lights[0].color.set(0xffffff)
            this.lights[1].color.set(0x11E8BB)
            this.lights[2].color.set(0x8200C9)
            this.ambientLight.color.set(0x999999)

            document.body.style.cursor = 'pointer'

            for ( let i = 0; i < this.parameters.length; ++ i ) {
              const p = this.parameters[ i ];
              this.line.scale.x = this.line.scale.y = this.line.scale.z = p[ 0 ];
            }
          }
        }

    },
    onDocumentClick(event){
      this.mouse.x = ( event.offsetX / this.canvasDom.clientWidth ) * 2 - 1;
	    this.mouse.y = - (event.offsetY / this.canvasDom.clientHeight ) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera)

      var intersects = this.raycaster.intersectObjects( this.scene.children );

      if(intersects.length > 0){
        const res = intersects.filter( function ( res ) {
        return res && res.object;
        } )[ 0 ];

        if ( res && res.object ) {
          this.$emit('click')
          
        }
      }
    },
    onWindowResize(){
      this.camera.aspect = this.canvasDom.clientWidth / this.canvasDom.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvasDom.clientWidth, this.canvasDom.clientHeight);
    },
  },
  
}
</script>
<style lang="scss">
  .container {
    position: relative;
    width:100%;
    height:100%;
  }
  .start-btn-text{
    border:1px solid red;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .theme--light {
    .canvas-wrap{
      background-color: transparent !important;
      box-shadow:none !important;
    }
  }
  
  .theme--dark {
    .canvas-wrap{
      position: relative;
      background-color: transparent !important;
      box-shadow: none !important;
      width: 100%;
    }
  }

  #canvas {
    width: 100% !important;
    height: 100% !important;
    cursor: pointer;
    canvas{
      position: absolute;
      top: 0;
      width:100% !important;
      height: 100% !important;
      transition: all 3s ease-in-out;
    }

    .canvas-caption{
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      user-select: none;
      
      z-index: 10;

      .caption-text{
        background: -webkit-linear-gradient(rgba(128,128,192,0.9), #2e67af);
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        -webkit-background-clip: text;
      }
      i{
        position: absolute;
        color: rgba(46,103,175,0.9);
        right:30px;
        top:-10px;
      }
    }
    

    &:hover{
      .canvas-btn{
        //background: -webkit-linear-gradient(rgba(128,128,192,0.9), #2e67af);
        //-webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        font-size: 32px;
      }
    }
  }

  

</style>