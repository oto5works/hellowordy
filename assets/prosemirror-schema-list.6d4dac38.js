import{f as $,a as h,c as C,l as S,b as L}from"./prosemirror-transform.3cf32640.js";import{N as y,F as u,S as I}from"./prosemirror-model.a115b74d.js";function O(o,i=null){return function(e,l){let{$from:r,$to:n}=e.selection,t=r.blockRange(n),d=!1,s=t;if(!t)return!1;if(t.depth>=2&&r.node(t.depth-1).type.compatibleContent(o)&&t.startIndex==0){if(r.index(t.depth-1)==0)return!1;let f=e.doc.resolve(t.start-2);s=new y(f,f,t.depth),t.endIndex<t.parent.childCount&&(t=new y(r,e.doc.resolve(n.end(t.depth)),t.depth)),d=!0}let c=$(s,o,i,t);return c?(l&&l(R(e.tr,t,c,d,o).scrollIntoView()),!0):!1}}function R(o,i,e,l,r){let n=u.empty;for(let f=e.length-1;f>=0;f--)n=u.from(e[f].type.create(e[f].attrs,n));o.step(new h(i.start-(l?2:0),i.end,i.start,i.end,new I(n,0,0),e.length,!0));let t=0;for(let f=0;f<e.length;f++)e[f].type==r&&(t=f+1);let d=e.length-t,s=i.start+e.length-(l?2:0),c=i.parent;for(let f=i.startIndex,p=i.endIndex,a=!0;f<p;f++,a=!1)!a&&C(o.doc,s,d)&&(o.split(s,d),s+=2*d),s+=c.child(f).nodeSize;return o}function V(o){return function(i,e){let{$from:l,$to:r}=i.selection,n=l.blockRange(r,t=>t.childCount>0&&t.firstChild.type==o);return n?e?l.node(n.depth-1).type==o?b(i,e,o,n):v(i,e,n):!0:!1}}function b(o,i,e,l){let r=o.tr,n=l.end,t=l.$to.end(l.depth);n<t&&(r.step(new h(n-1,t,n,t,new I(u.from(e.create(null,l.parent.copy())),1,0),1,!0)),l=new y(r.doc.resolve(l.$from.pos),r.doc.resolve(t),l.depth));const d=S(l);if(d==null)return!1;r.lift(l,d);let s=r.mapping.map(n,-1)-1;return L(r.doc,s)&&r.join(s),i(r.scrollIntoView()),!0}function v(o,i,e){let l=o.tr,r=e.parent;for(let m=e.end,x=e.endIndex-1,w=e.startIndex;x>w;x--)m-=r.child(x).nodeSize,l.delete(m-1,m+1);let n=l.doc.resolve(e.start),t=n.nodeAfter;if(l.mapping.map(e.end)!=e.start+n.nodeAfter.nodeSize)return!1;let d=e.startIndex==0,s=e.endIndex==r.childCount,c=n.node(-1),f=n.index(-1);if(!c.canReplace(f+(d?0:1),f+1,t.content.append(s?u.empty:u.from(r))))return!1;let p=n.pos,a=p+t.nodeSize;return l.step(new h(p-(d?1:0),a+(s?1:0),p+1,a-1,new I((d?u.empty:u.from(r.copy(u.empty))).append(s?u.empty:u.from(r.copy(u.empty))),d?0:1,s?0:1),d?0:1)),i(l.scrollIntoView()),!0}function A(o){return function(i,e){let{$from:l,$to:r}=i.selection,n=l.blockRange(r,c=>c.childCount>0&&c.firstChild.type==o);if(!n)return!1;let t=n.startIndex;if(t==0)return!1;let d=n.parent,s=d.child(t-1);if(s.type!=o)return!1;if(e){let c=s.lastChild&&s.lastChild.type==d.type,f=u.from(c?o.create():null),p=new I(u.from(o.create(null,u.from(d.type.create(null,f)))),c?3:1,0),a=n.start,m=n.end;e(i.tr.step(new h(a-(c?3:1),m,a,m,p,1,!0)).scrollIntoView())}return!0}}export{V as l,A as s,O as w};
