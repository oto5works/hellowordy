import{S as m,M as R,F as x,c as B}from"./prosemirror-model.a115b74d.js";import{R as P,a as K,T as $}from"./prosemirror-transform.3cf32640.js";const O=Object.create(null);class l{constructor(e,t,r){this.$anchor=e,this.$head=t,this.ranges=r||[new q(e.min(t),e.max(t))]}get anchor(){return this.$anchor.pos}get head(){return this.$head.pos}get from(){return this.$from.pos}get to(){return this.$to.pos}get $from(){return this.ranges[0].$from}get $to(){return this.ranges[0].$to}get empty(){let e=this.ranges;for(let t=0;t<e.length;t++)if(e[t].$from.pos!=e[t].$to.pos)return!1;return!0}content(){return this.$from.doc.slice(this.from,this.to,!0)}replace(e,t=m.empty){let r=t.content.lastChild,n=null;for(let a=0;a<t.openEnd;a++)n=r,r=r.lastChild;let s=e.steps.length,o=this.ranges;for(let a=0;a<o.length;a++){let{$from:c,$to:u}=o[a],h=e.mapping.slice(s);e.replaceRange(h.map(c.pos),h.map(u.pos),a?m.empty:t),a==0&&E(e,s,(r?r.isInline:n&&n.isTextblock)?-1:1)}}replaceWith(e,t){let r=e.steps.length,n=this.ranges;for(let s=0;s<n.length;s++){let{$from:o,$to:a}=n[s],c=e.mapping.slice(r),u=c.map(o.pos),h=c.map(a.pos);s?e.deleteRange(u,h):(e.replaceRangeWith(u,h,t),E(e,r,t.isInline?-1:1))}}static findFrom(e,t,r=!1){let n=e.parent.inlineContent?new f(e):g(e.node(0),e.parent,e.pos,e.index(),t,r);if(n)return n;for(let s=e.depth-1;s>=0;s--){let o=t<0?g(e.node(0),e.node(s),e.before(s+1),e.index(s),t,r):g(e.node(0),e.node(s),e.after(s+1),e.index(s)+1,t,r);if(o)return o}return null}static near(e,t=1){return this.findFrom(e,t)||this.findFrom(e,-t)||new d(e.node(0))}static atStart(e){return g(e,e,0,0,1)||new d(e)}static atEnd(e){return g(e,e,e.content.size,e.childCount,-1)||new d(e)}static fromJSON(e,t){if(!t||!t.type)throw new RangeError("Invalid input for Selection.fromJSON");let r=O[t.type];if(!r)throw new RangeError(`No selection type ${t.type} defined`);return r.fromJSON(e,t)}static jsonID(e,t){if(e in O)throw new RangeError("Duplicate use of selection JSON ID "+e);return O[e]=t,t.prototype.jsonID=e,t}getBookmark(){return f.between(this.$anchor,this.$head).getBookmark()}}l.prototype.visible=!0;class q{constructor(e,t){this.$from=e,this.$to=t}}let T=!1;function I(i){!T&&!i.parent.inlineContent&&(T=!0,console.warn("TextSelection endpoint not pointing into a node with inline content ("+i.parent.type.name+")"))}class f extends l{constructor(e,t=e){I(e),I(t),super(e,t)}get $cursor(){return this.$anchor.pos==this.$head.pos?this.$head:null}map(e,t){let r=e.resolve(t.map(this.head));if(!r.parent.inlineContent)return l.near(r);let n=e.resolve(t.map(this.anchor));return new f(n.parent.inlineContent?n:r,r)}replace(e,t=m.empty){if(super.replace(e,t),t==m.empty){let r=this.$from.marksAcross(this.$to);r&&e.ensureMarks(r)}}eq(e){return e instanceof f&&e.anchor==this.anchor&&e.head==this.head}getBookmark(){return new y(this.anchor,this.head)}toJSON(){return{type:"text",anchor:this.anchor,head:this.head}}static fromJSON(e,t){if(typeof t.anchor!="number"||typeof t.head!="number")throw new RangeError("Invalid input for TextSelection.fromJSON");return new f(e.resolve(t.anchor),e.resolve(t.head))}static create(e,t,r=t){let n=e.resolve(t);return new this(n,r==t?n:e.resolve(r))}static between(e,t,r){let n=e.pos-t.pos;if((!r||n)&&(r=n>=0?1:-1),!t.parent.inlineContent){let s=l.findFrom(t,r,!0)||l.findFrom(t,-r,!0);if(s)t=s.$head;else return l.near(t,r)}return e.parent.inlineContent||(n==0?e=t:(e=(l.findFrom(e,-r,!0)||l.findFrom(e,r,!0)).$anchor,e.pos<t.pos!=n<0&&(e=t))),new f(e,t)}}l.jsonID("text",f);class y{constructor(e,t){this.anchor=e,this.head=t}map(e){return new y(e.map(this.anchor),e.map(this.head))}resolve(e){return f.between(e.resolve(this.anchor),e.resolve(this.head))}}class p extends l{constructor(e){let t=e.nodeAfter,r=e.node(0).resolve(e.pos+t.nodeSize);super(e,r),this.node=t}map(e,t){let{deleted:r,pos:n}=t.mapResult(this.anchor),s=e.resolve(n);return r?l.near(s):new p(s)}content(){return new m(x.from(this.node),0,0)}eq(e){return e instanceof p&&e.anchor==this.anchor}toJSON(){return{type:"node",anchor:this.anchor}}getBookmark(){return new J(this.anchor)}static fromJSON(e,t){if(typeof t.anchor!="number")throw new RangeError("Invalid input for NodeSelection.fromJSON");return new p(e.resolve(t.anchor))}static create(e,t){return new p(e.resolve(t))}static isSelectable(e){return!e.isText&&e.type.spec.selectable!==!1}}p.prototype.visible=!1;l.jsonID("node",p);class J{constructor(e){this.anchor=e}map(e){let{deleted:t,pos:r}=e.mapResult(this.anchor);return t?new y(r,r):new J(r)}resolve(e){let t=e.resolve(this.anchor),r=t.nodeAfter;return r&&p.isSelectable(r)?new p(t):l.near(t)}}class d extends l{constructor(e){super(e.resolve(0),e.resolve(e.content.size))}replace(e,t=m.empty){if(t==m.empty){e.delete(0,e.doc.content.size);let r=l.atStart(e.doc);r.eq(e.selection)||e.setSelection(r)}else super.replace(e,t)}toJSON(){return{type:"all"}}static fromJSON(e){return new d(e)}map(e){return new d(e)}eq(e){return e instanceof d}getBookmark(){return z}}l.jsonID("all",d);const z={map(){return this},resolve(i){return new d(i)}};function g(i,e,t,r,n,s=!1){if(e.inlineContent)return f.create(i,t);for(let o=r-(n>0?0:1);n>0?o<e.childCount:o>=0;o+=n){let a=e.child(o);if(a.isAtom){if(!s&&p.isSelectable(a))return p.create(i,t-(n<0?a.nodeSize:0))}else{let c=g(i,a,t+n,n<0?a.childCount:0,n,s);if(c)return c}t+=a.nodeSize*n}return null}function E(i,e,t){let r=i.steps.length-1;if(r<e)return;let n=i.steps[r];if(!(n instanceof P||n instanceof K))return;let s=i.mapping.maps[r],o;s.forEach((a,c,u,h)=>{o==null&&(o=h)}),i.setSelection(l.near(i.doc.resolve(o),t))}const b=1,k=2,F=4;class W extends ${constructor(e){super(e.doc),this.curSelectionFor=0,this.updated=0,this.meta=Object.create(null),this.time=Date.now(),this.curSelection=e.selection,this.storedMarks=e.storedMarks}get selection(){return this.curSelectionFor<this.steps.length&&(this.curSelection=this.curSelection.map(this.doc,this.mapping.slice(this.curSelectionFor)),this.curSelectionFor=this.steps.length),this.curSelection}setSelection(e){if(e.$from.doc!=this.doc)throw new RangeError("Selection passed to setSelection must point at the current document");return this.curSelection=e,this.curSelectionFor=this.steps.length,this.updated=(this.updated|b)&~k,this.storedMarks=null,this}get selectionSet(){return(this.updated&b)>0}setStoredMarks(e){return this.storedMarks=e,this.updated|=k,this}ensureMarks(e){return R.sameSet(this.storedMarks||this.selection.$from.marks(),e)||this.setStoredMarks(e),this}addStoredMark(e){return this.ensureMarks(e.addToSet(this.storedMarks||this.selection.$head.marks()))}removeStoredMark(e){return this.ensureMarks(e.removeFromSet(this.storedMarks||this.selection.$head.marks()))}get storedMarksSet(){return(this.updated&k)>0}addStep(e,t){super.addStep(e,t),this.updated=this.updated&~k,this.storedMarks=null}setTime(e){return this.time=e,this}replaceSelection(e){return this.selection.replace(this,e),this}replaceSelectionWith(e,t=!0){let r=this.selection;return t&&(e=e.mark(this.storedMarks||(r.empty?r.$from.marks():r.$from.marksAcross(r.$to)||R.none))),r.replaceWith(this,e),this}deleteSelection(){return this.selection.replace(this),this}insertText(e,t,r){let n=this.doc.type.schema;if(t==null)return e?this.replaceSelectionWith(n.text(e),!0):this.deleteSelection();{if(r==null&&(r=t),r=r==null?t:r,!e)return this.deleteRange(t,r);let s=this.storedMarks;if(!s){let o=this.doc.resolve(t);s=r==t?o.marks():o.marksAcross(this.doc.resolve(r))}return this.replaceRangeWith(t,r,n.text(e,s)),this.selection.empty||this.setSelection(l.near(this.selection.$to)),this}}setMeta(e,t){return this.meta[typeof e=="string"?e:e.key]=t,this}getMeta(e){return this.meta[typeof e=="string"?e:e.key]}get isGeneric(){for(let e in this.meta)return!1;return!0}scrollIntoView(){return this.updated|=F,this}get scrolledIntoView(){return(this.updated&F)>0}}function D(i,e){return!e||!i?i:i.bind(e)}class S{constructor(e,t,r){this.name=e,this.init=D(t.init,r),this.apply=D(t.apply,r)}}const L=[new S("doc",{init(i){return i.doc||i.schema.topNodeType.createAndFill()},apply(i){return i.doc}}),new S("selection",{init(i,e){return i.selection||l.atStart(e.doc)},apply(i){return i.selection}}),new S("storedMarks",{init(i){return i.storedMarks||null},apply(i,e,t,r){return r.selection.$cursor?i.storedMarks:null}}),new S("scrollToSelection",{init(){return 0},apply(i,e){return i.scrolledIntoView?e+1:e}})];class v{constructor(e,t){this.schema=e,this.plugins=[],this.pluginsByKey=Object.create(null),this.fields=L.slice(),t&&t.forEach(r=>{if(this.pluginsByKey[r.key])throw new RangeError("Adding different instances of a keyed plugin ("+r.key+")");this.plugins.push(r),this.pluginsByKey[r.key]=r,r.spec.state&&this.fields.push(new S(r.key,r.spec.state,r))})}}class w{constructor(e){this.config=e}get schema(){return this.config.schema}get plugins(){return this.config.plugins}apply(e){return this.applyTransaction(e).state}filterTransaction(e,t=-1){for(let r=0;r<this.config.plugins.length;r++)if(r!=t){let n=this.config.plugins[r];if(n.spec.filterTransaction&&!n.spec.filterTransaction.call(n,e,this))return!1}return!0}applyTransaction(e){if(!this.filterTransaction(e))return{state:this,transactions:[]};let t=[e],r=this.applyInner(e),n=null;for(;;){let s=!1;for(let o=0;o<this.config.plugins.length;o++){let a=this.config.plugins[o];if(a.spec.appendTransaction){let c=n?n[o].n:0,u=n?n[o].state:this,h=c<t.length&&a.spec.appendTransaction.call(a,c?t.slice(c):t,u,r);if(h&&r.filterTransaction(h,o)){if(h.setMeta("appendedTransaction",e),!n){n=[];for(let M=0;M<this.config.plugins.length;M++)n.push(M<o?{state:r,n:t.length}:{state:this,n:0})}t.push(h),r=r.applyInner(h),s=!0}n&&(n[o]={state:r,n:t.length})}}if(!s)return{state:r,transactions:t}}}applyInner(e){if(!e.before.eq(this.doc))throw new RangeError("Applying a mismatched transaction");let t=new w(this.config),r=this.config.fields;for(let n=0;n<r.length;n++){let s=r[n];t[s.name]=s.apply(e,this[s.name],this,t)}return t}get tr(){return new W(this)}static create(e){let t=new v(e.doc?e.doc.type.schema:e.schema,e.plugins),r=new w(t);for(let n=0;n<t.fields.length;n++)r[t.fields[n].name]=t.fields[n].init(e,r);return r}reconfigure(e){let t=new v(this.schema,e.plugins),r=t.fields,n=new w(t);for(let s=0;s<r.length;s++){let o=r[s].name;n[o]=this.hasOwnProperty(o)?this[o]:r[s].init(e,n)}return n}toJSON(e){let t={doc:this.doc.toJSON(),selection:this.selection.toJSON()};if(this.storedMarks&&(t.storedMarks=this.storedMarks.map(r=>r.toJSON())),e&&typeof e=="object")for(let r in e){if(r=="doc"||r=="selection")throw new RangeError("The JSON fields `doc` and `selection` are reserved");let n=e[r],s=n.spec.state;s&&s.toJSON&&(t[r]=s.toJSON.call(n,this[n.key]))}return t}static fromJSON(e,t,r){if(!t)throw new RangeError("Invalid input for EditorState.fromJSON");if(!e.schema)throw new RangeError("Required config field 'schema' missing");let n=new v(e.schema,e.plugins),s=new w(n);return n.fields.forEach(o=>{if(o.name=="doc")s.doc=B.fromJSON(e.schema,t.doc);else if(o.name=="selection")s.selection=l.fromJSON(s.doc,t.selection);else if(o.name=="storedMarks")t.storedMarks&&(s.storedMarks=t.storedMarks.map(e.schema.markFromJSON));else{if(r)for(let a in r){let c=r[a],u=c.spec.state;if(c.key==o.name&&u&&u.fromJSON&&Object.prototype.hasOwnProperty.call(t,a)){s[o.name]=u.fromJSON.call(c,e,t[a],s);return}}s[o.name]=o.init(e,s)}}),s}}function A(i,e,t){for(let r in i){let n=i[r];n instanceof Function?n=n.bind(e):r=="handleDOMEvents"&&(n=A(n,e,{})),t[r]=n}return t}class G{constructor(e){this.spec=e,this.props={},e.props&&A(e.props,this,this.props),this.key=e.key?e.key.key:C("plugin")}getState(e){return e[this.key]}}const N=Object.create(null);function C(i){return i in N?i+"$"+ ++N[i]:(N[i]=0,i+"$")}class H{constructor(e="key"){this.key=C(e)}get(e){return e.config.pluginsByKey[this.key]}getState(e){return e[this.key]}}export{d as A,w as E,p as N,G as P,l as S,f as T,H as a};
