AUI.add("aui-diagram-builder-impl",function(au){var ag=au.Lang,c=ag.isArray,I=ag.isObject,aV=ag.isString,aR=ag.isBoolean,a4=au.Array,Z=function(A){return(A instanceof au.DiagramBuilderBase);},aS=function(A){return(A instanceof au.DiagramNode);},ao=function(A){return(A instanceof au.Anchor);},az=function(A,a7){var a6=c(a7)?a7:a7.getXY();var a8=c(A)?A:A.getXY();return a4.map(a8,function(ba,a9){return Math.max(0,ba-a6[a9]);});},ae="activeElement",ax="addAnchor",aY="addAnchorMessage",j="addNode",aB="anchor",av="anchors",an="anchorsDragConfig",U="availableField",ac="boolean",p="boundingBox",a0="builder",ak="cancel",al="canvas",aJ="click",aW="closeEvent",F="closeMessage",aZ="condition",aq="content",O="controls",aH="controlsToolbar",aG="data",am="dblclick",Y="delete",aE="deleteConnectorsMessage",n="deleteNodesMessage",aN="description",G="diagram",ap="diagram-builder",aA="diagramNode",B="diagram-node",aO="dragNode",C="editEvent",L="editMessage",Q="editing",aM="end",a="esc",aQ="field",r="fields",ay="fieldsDragConfig",at="fork",aa="graphic",aP="height",q="hover",aI="id",t="join",S="keydown",ar="link",ai="max",V="maxFields",v="maxSources",s="mouseenter",ad="mouseleave",m="name",o="node",aD="p1",aC="p2",d="parentNode",l="pencil",aj="records",k="recordset",h="region",a1="rendered",K="required",aU="selected",J="shuffle",R="source",aT="sources",aF="start",ab="state",i="target",M="targets",D="task",P="tmpConnector",e="type",N="width",aX="wrapper",y="xy",x="zIndex",a3="-",g=".",T="",f="#",H="_",w=au.getClassName,W=w(G,a0,aB,o,ai,M),aw=w(G,a0,aB,q),aL=w(G,a0,aB,o),E=w(G,a0,aB,o,aX),u=w(G,a0,O),af=w(G,o),b=w(G,o,aq),aK=w(G,o,Q),a2=w(G,o,aU);var ah=function(){var a6="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",A="<br/>";au.all(".aui-diagram-node").each(function(bc){var a7=T,a9=au.Widget.getByNode(bc),a8=a9.get("name"),bb=a9.get("boundingBox"),ba=bb.one(".log")||au.Node.create("<div class=log />").appendTo(bb);a7+=a8+A;a9.get(r).each(function(bd){a7+=a6+"a: "+bd.get("id")+A;bd.get("targets").each(function(be){var bf=be.get(aA);be.get("node").setContent(be.get("id"));a7+=a6+a6+"t: "+bf.get("name")+" (s: "+be.get("id")+")"+A;});bd.get("sources").each(function(bf){var be=bf.get(aA);bf.get("node").setContent(bf.get("id"));a7+=a6+a6+"s: "+be.get("name")+" (t: "+bf.get("id")+")"+A;});});ba.setContent(a7);});};var z=au.Component.create({NAME:ap,ATTRS:{fieldsDragConfig:{value:null,setter:"_setFieldsDragConfig",validator:I},graphic:{valueFn:function(){return new au.Graphic();},validator:I},strings:{value:{addNode:"Add node",cancel:"Cancel",deleteConnectorsMessage:"Are you sure you want to delete the selected connector(s)?",propertyName:"Property Name",save:"Save",settings:"Settings",value:"Value"}},tmpConnector:{setter:"_setTmpConnector",value:{},validator:I}},EXTENDS:au.DiagramBuilderBase,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{selectedConnector:null,selectedNode:null,initializer:function(){var A=this;A.on({cancel:A._onCancel,"drag:drag":A._onDrag,"drag:end":A._onDragEnd,"drop:hit":A._onDropHit,save:A._onSave});A.handlerKeyDown=au.getDoc().on(S,au.bind(A._afterKeyEvent,A));A.dropContainer.delegate(aJ,au.bind(A._onNodeClick,A),g+af);A.dropContainer.delegate(am,au.bind(A._onNodeEdit,A),g+af);A.dropContainer.delegate(s,au.bind(A._onMouseenterAnchors,A),g+aL);A.dropContainer.delegate(ad,au.bind(A._onMouseleaveAnchors,A),g+aL);},renderUI:function(){var A=this;au.DiagramBuilder.superclass.renderUI.apply(this,arguments);A._renderGraphic();},syncUI:function(){var A=this;au.DiagramBuilder.superclass.syncUI.apply(this,arguments);A._setupFieldsDrag();A.tmpConnector=new au.Connector(A.get(P));},clearFields:function(){var a6=this;var A=[];a6.get(r).each(function(a7){A.push(a7);});a4.each(A,function(a7){a7.destroy();});A=null;},closeEditProperties:function(){var A=this;var a6=A.editingNode;A.tabView.selectTab(au.DiagramBuilder.FIELDS_TAB);if(a6){a6.get(p).removeClass(aK);}A.editingConnector=null;A.editingNode=null;},connect:function(a7,ba,a9){var a6=this;if(aV(a7)){a7=au.Widget.getByNode(f+au.DiagramNode.buildNodeId(a7));}if(aV(ba)){ba=au.Widget.getByNode(f+au.DiagramNode.buildNodeId(ba));}if(a7&&ba){var a8=a7.findAvailableAnchor();var A=ba.findAvailableAnchor();if(a8&&A){a8.connect(A,a9);}}return a6;},connectAll:function(a6){var A=this;a4.each(a6,function(a7){if(a7.hasOwnProperty(R)&&a7.hasOwnProperty(i)){A.connect(a7.source,a7.target,a7.connector);}});return A;},createField:function(a6){var A=this;if(!aS(a6)){a6.builder=A;a6=new (A.getFieldClass(a6.type||o))(a6);}a6.set(a0,A);return a6;},deleteConnectors:function(a6){var A=this;a4.each(a6,function(a7){var a8=a7.get(aB);if(a8){var a9=a8.findConnectorTarget(a7);if(a9){a8.disconnect(a9);}}});},eachConnetor:function(a7){var A=this;var a6=false;A.get(r).some(function(a8){a8.get(r).some(function(a9){au.some(a9.connectors,function(ba){a6=a7.call(A,ba,a9,a8);return a6;});return a6;});return a6;});},editConnector:function(a6){var A=this;if(a6){A.closeEditProperties();A.tabView.selectTab(au.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(k,a6.getProperties());A.editingConnector=A.selectedConnector=a6;}},editNode:function(a6){var A=this;if(a6){A.closeEditProperties();A.tabView.selectTab(au.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(k,a6.getProperties());a6.get(p).addClass(aK);A.editingNode=A.selectedNode=a6;}},getSelectedConnectors:function(){var A=this;var a6=[];A.eachConnetor(function(a7){if(a7.get(aU)){a6.push(a7);}});return a6;},getFieldClass:function(a7){var A=this;var a6=au.DiagramBuilder.types[a7];if(a6){return a6;}else{au.log("The field type: ["+a7+"] couldn't be found.");return null;}},isFieldsDrag:function(a7){var A=this;var a6=A.fieldsDrag;return(a7===a6.dd);},plotField:function(a6){var A=this;if(!a6.get(a1)){a6.render(A.dropContainer);}},unselectConnectors:function(){var A=this;a4.each(A.getSelectedConnectors(),function(a6){a6.set(aU,false);});},unselectNodes:function(){var A=this;var a6=A.selectedNode;if(a6){a6.set(aU,false);}A.selectedNode=null;},select:function(a6){var A=this;
A.unselectNodes();A.selectedNode=a6.set(aU,true).focus();},stopEditing:function(){var A=this;A.unselectConnectors();A.unselectNodes();A.closeEditProperties();},toJSON:function(){var A=this;var a6={nodes:[]};A.get(r).each(function(a8){var a9=a8.get(m);var a7={transitions:[]};a4.each(a8.SERIALIZABLE_ATTRS,function(ba){a7[ba]=a8.get(ba);});a8.get(r).each(function(ba){ba.get(M).each(function(bb){a7.transitions.push({connector:ba.getConnector(bb).toJSON(),source:a9,target:bb.get(aA).get(m)});});});a6.nodes.push(a7);});return a6;},_afterKeyEvent:function(a6){var A=this;if(a6.hasModifier()||au.getDoc().get(ae).test(":input,td")){return;}if(a6.isKey(a)){A._onEscKey(a6);}else{if(a6.isKey(Y)){A._onDeleteKey(a6);}}},_onCancel:function(a6){var A=this;A.closeEditProperties();},_onDrag:function(a7){var A=this;var a6=a7.target;if(A.isFieldsDrag(a6)){var a8=au.Widget.getByNode(a6.get(aO));a8.get(r).each(function(a9){a9.alignConnectors();});}},_onDragEnd:function(a7){var A=this;var a6=a7.target;if(A.isFieldsDrag(a6)){var a8=au.Widget.getByNode(a6.get(aO));a8.set(y,a8.getLeftTop());}},_onDropHit:function(a7){var A=this;var a6=a7.drag;if(A.isAvailableFieldsDrag(a6)){var a9=a6.get(o).getData(U);var a8=A.addField({xy:az(a6.lastXY,A.dropContainer),type:a9.get(e),fields:[{}]});A.select(a8);}},_onDeleteKey:function(a8){var a6=this;var A=a6.getStrings();var a7=a6.getSelectedConnectors();if(a7.length&&confirm(A[aE])){a6.deleteConnectors(a7);}var a9=a6.selectedNode;if(a9){if(!a9.get(K)){a9.close();}}a8.halt();},_onEscKey:function(a6){var A=this;A.stopEditing();a6.halt();},_onMouseenterAnchors:function(a6){var A=this;a6.currentTarget.addClass(aw);},_onMouseleaveAnchors:function(a6){var A=this;a6.currentTarget.removeClass(aw);},_onNodeClick:function(a6){var A=this;var a7=au.Widget.getByNode(a6.currentTarget);A.select(a7);},_onNodeEdit:function(a6){var A=this;if(!a6.target.ancestor(g+b,true)){return;}var a7=au.Widget.getByNode(a6.currentTarget);if(a7){A.editNode(a7);}},_onSave:function(a7){var A=this;var a6=A.editingNode;var a8=A.editingConnector;var a9=A.propertyList.get(k);if(a6){a4.each(a9.get(aj),function(ba){var bb=ba.get(aG);a6.set(bb.attributeName,bb.value);});}else{if(a8){a4.each(a9.get(aj),function(ba){var bb=ba.get(aG);a8.set(bb.attributeName,bb.value);});}}A.closeEditProperties();},_renderGraphic:function(){var A=this;A.get(aa).render(A.get(al));},_setTmpConnector:function(a7){var A=this;var a6=A.get(al).getXY();return au.merge({p1:a6,p2:a6,lazyDraw:true,graphic:A.get(aa)},a7);},_setFieldsDragConfig:function(a7){var A=this;var a6=A.dropContainer;return au.merge({bubbleTargets:A,container:a6,dragConfig:{plugins:[{cfg:{constrain:a6},fn:au.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:au.Plugin.DDWinScroll}]},nodes:g+af},a7||{});},_setupFieldsDrag:function(){var A=this;A.fieldsDrag=new au.DD.Delegate(A.get(ay));}}});au.DiagramBuilder=z;au.DiagramBuilder.types={};var X=au.Component.create({NAME:B,EXTENDS:au.Overlay,AUGMENTS:[au.FieldSupport]});var a5=au.Component.create({NAME:B,UI_ATTRS:[r,m,K,aU],ATTRS:{anchorsDragConfig:{value:null,setter:"_setAnchorsDragConfig",validator:I},builder:{validator:Z},required:{value:false,validator:aR},description:{value:T,validator:aV},height:{value:60},name:{valueFn:function(){var A=this;return A.get(e)+(++au.Env._uidx);},validator:aV},selected:{value:false,validator:aR},strings:{value:{addAnchorMessage:"Add Anchor",closeMessage:"Close",deleteNodesMessage:"Are you sure you want to delete the selected node(s)?",description:"Description",editMessage:"Edit",name:"Name",type:"Type"}},type:{value:o,validator:aV},controlsToolbar:{validator:I,valueFn:"_valueControlsToolbar"},width:{value:60},zIndex:{value:100},tabIndex:{value:1}},EXTENDS:X,buildNodeId:function(A){return aA+H+aQ+H+A;},prototype:{ANCHOR_WRAPPER_TEMPLATE:'<div class="'+E+'"></div>',CONTROLS_TEMPLATE:'<div class="'+u+'"></div>',SERIALIZABLE_ATTRS:[aN,m,K,e,N,aP,x,y,V],initializer:function(){var A=this;A._renderNodes();A._setupAnchorsDrag();A.after({render:A._afterRender});A.on({"drag:drag":A._onAnchorDrag,"drag:end":A._onAnchorDragEnd,"drag:start":A._onAnchorDragStart,"drop:hit":A._onAnchorDropHit});A.get(p).addClass(af+a3+A.get(e));},destructor:function(){var A=this;A.get(r).each(function(a6){a6.destroy();});A.get(a0).removeField(A);},alignAnchors:function(){var a6=this;var ba=a6.get(r);var a8=a6.get(p).get(h),a9=Math.floor(360/ba.size()),a7=a8.width/2,A=a8.height/2,bc=a8.left+a8.width/2,bb=a8.top+a8.height/2;ba.each(function(bg,bf){var be=bg.get(o);var bh=be.get(h);var bd=a6._getEllipseXY(a7,A,bc,bb,bf*a9);be.setXY([bd[0]-bh.width/2,bd[1]-bh.height/2]);bg.alignConnectors();});return a6;},close:function(){var a6=this;var A=a6.getStrings();if(confirm(A[n])){a6.destroy();}return a6;},createField:function(a7){var A=this;if(!ao(a7)){var a6=A.get(a0);a7.diagramNode=A;a7=new au.Anchor(a7);}return a7;},findAvailableAnchor:function(){var A=this;var a6=null;A.get(r).some(function(a7){if(!a7.hasConnection()){a6=a7;return true;}});if(!a6){a6=A.addField({});}return a6;},getConnectionNode:function(){var A=this;return new au.DiagramNode({xy:[100,100]});},getLeftTop:function(){var A=this;return az(A.get(p),A._getContainer());},getProperties:function(){var A=this;var a6=A.getPropertyModel();a4.each(a6,function(a9){var a8=A.get(a9.attributeName),a7=ag.type(a8);if(a7===ac){a8=String(a8);}a9.value=a8;});return a6;},getPropertyModel:function(){var a6=this;var A=a6.getStrings();return[{attributeName:aN,editor:new au.TextAreaCellEditor(),name:A[aN]},{attributeName:m,editor:new au.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[m]},{attributeName:e,editor:false,name:A[e]}];},syncDragTargets:function(){var A=this;A.anchorsDrag.syncTargets();},syncDropTargets:function(a6){var A=this;A.get(r).each(function(a8){var a7=au.DD.DDM.getDrop(a8.get(o));if(a7){if(a8.get(aT).size()===a8.get(v)){a7.removeFromGroup(av);}else{a7.addToGroup(av);}}});},_afterRender:function(a6){var A=this;A.alignAnchors();A._renderControls();},_getContainer:function(){var A=this;
return(A.get(a0).dropContainer||A.get(p).get(d));},_getEllipseXY:function(a6,A,a9,a8,ba){var a7=ba*Math.PI/180;return[a9+a6*Math.cos(a7),a8-A*Math.sin(a7)];},_handleAddAnchorEvent:function(a6){var A=this;A.addField({});},_handleAddNodeEvent:function(a7){var A=this;var a6=A.get(a0);var a8=A.findAvailableAnchor();if(a8){var a9=A.getConnectionNode();a6.addField(a9);a8.connect(a9.addField({}));}},_handleEditEvent:function(a6){var A=this;A.get(a0).editNode(A);},_handleCloseEvent:function(a6){var A=this;if(!A.get(K)){A.close();}},_onAnchorDrag:function(a7){var A=this;var a6=A.get(a0);a6.tmpConnector.set(aC,a7.target.get(aO).getCenterXY());},_onAnchorDragEnd:function(a7){var A=this;var a6=A.get(a0).tmpConnector.shape;a6.clear();a6.end();},_onAnchorDragStart:function(a7){var A=this;var a6=A.get(a0);a6.tmpConnector.set(aD,a7.target.get(o).getCenterXY());},_onAnchorDropHit:function(a6){var A=this;var a7=au.Anchor.getAnchorByNode(a6.drag.get(o));var a8=au.Anchor.getAnchorByNode(a6.drop.get(o));a7.connect(a8);},_renderControls:function(){var A=this;var a6=A.get(p);A.controlsNode=au.Node.create(A.CONTROLS_TEMPLATE).appendTo(a6);},_renderNodes:function(){var A=this;var a6=A.get(p);A.anchorWrapper=au.Node.create(A.ANCHOR_WRAPPER_TEMPLATE).appendTo(a6);},_renderControlsToolbar:function(a6){var A=this;A.controlsToolbar=new au.Toolbar(A.get(aH)).render(A.controlsNode);A._uiSetRequired(A.get(K));},_setAnchorsDragConfig:function(a7){var A=this;var a6=A.get(a0);return au.merge({bubbleTargets:A,container:A.anchorWrapper,dragConfig:{groups:[av],plugins:[{cfg:{constrain:(a6?a6.get(al):null)},fn:au.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:au.Plugin.DDWinScroll},{cfg:{moveOnEnd:false},fn:au.Plugin.DDProxy}]},nodes:g+aL,target:true},a7||{});},_setupAnchorsDrag:function(){var A=this;A.anchorsDrag=new au.DD.Delegate(A.get(an));A.anchorsDrag.dd.addInvalid(g+W);},_uiSetFields:function(a6){var A=this;if(A.get(a1)){A.alignAnchors();A.syncDragTargets();A.syncDropTargets();}},_uiSetName:function(a7){var A=this;var a6=A.get(p);a6.set(aI,au.DiagramNode.buildNodeId(a7));},_uiSetRequired:function(a8){var a7=this;var a6=a7.getStrings();var A=a7.controlsToolbar;if(A){if(a8){A.remove(aW);}else{A.add({handler:au.bind(a7._handleCloseEvent,a7),icon:ak,id:aW,title:a6[F]});}}},_uiSetSelected:function(a6){var A=this;A.get(p).toggleClass(a2,a6);if(a6&&!A.controlsToolbar){A._renderControlsToolbar();}},_uiSetXY:function(a7){var A=this;var a6=A._getContainer().getXY();this._posNode.setXY([a7[0]+a6[0],a7[1]+a6[1]]);},_valueControlsToolbar:function(a7){var a6=this;var A=a6.getStrings();return{activeState:false,children:[{handler:au.bind(a6._handleEditEvent,a6),icon:l,id:C,title:A[L]},{handler:au.bind(a6._handleAddAnchorEvent,a6),icon:ar,id:ax,title:A[aY]},{handler:au.bind(a6._handleAddNodeEvent,a6),icon:J,id:j},{handler:au.bind(a6._handleCloseEvent,a6),icon:ak,id:aW,title:A[F]}]};}}});au.DiagramNode=a5;au.DiagramBuilder.types[o]=au.DiagramNode;au.DiagramNodeState=au.Component.create({NAME:B,ATTRS:{height:{value:40},type:{value:ab},width:{value:40}},EXTENDS:au.DiagramNode,});au.DiagramBuilder.types[ab]=au.DiagramNodeState;au.DiagramNodeCondition=au.Component.create({NAME:B,ATTRS:{height:{value:60},type:{value:aZ},width:{value:60}},EXTENDS:au.DiagramNodeState,});au.DiagramBuilder.types[aZ]=au.DiagramNodeCondition;au.DiagramNodeStart=au.Component.create({NAME:B,ATTRS:{type:{value:aF}},EXTENDS:au.DiagramNodeState,});au.DiagramBuilder.types[aF]=au.DiagramNodeStart;au.DiagramNodeEnd=au.Component.create({NAME:B,ATTRS:{type:{value:aM}},EXTENDS:au.DiagramNodeState,});au.DiagramBuilder.types[aM]=au.DiagramNodeEnd;au.DiagramNodeJoin=au.Component.create({NAME:B,ATTRS:{height:{value:60},type:{value:t},width:{value:60}},EXTENDS:au.DiagramNodeState,});au.DiagramBuilder.types[t]=au.DiagramNodeJoin;au.DiagramNodeFork=au.Component.create({NAME:B,ATTRS:{height:{value:60},type:{value:at},width:{value:60}},EXTENDS:au.DiagramNodeState,});au.DiagramBuilder.types[at]=au.DiagramNodeFork;au.DiagramNodeTask=au.Component.create({NAME:B,ATTRS:{height:{value:70},type:{value:D},width:{value:70}},EXTENDS:au.DiagramNodeState,});au.DiagramBuilder.types[D]=au.DiagramNodeTask;},"@VERSION@",{requires:["aui-diagram-builder-base","overlay"],skinnable:true});