package com.honitor.zuul.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class PostFilter extends ZuulFilter {
    @Override
    public String filterType() {
        return "post";
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        try{
            RequestContext ctx = RequestContext.getCurrentContext();
            log.info("[honitor-gateway][POST]" + ctx);
        }catch (Exception e){
        }
        return null;
    }

}
