
var Sort=(function(){var sort={};sort.alphanumeric=function(a,b){return(a==b)?0:(a<b)?-1:1;};sort['default']=sort.alphanumeric;sort.numeric_converter=function(separator){return function(val){if(typeof(val)=="string"){val=parseFloat(val.replace(/^[^\d\.]*([\d., ]+).*/g,"$1").replace(new RegExp("[^\\\d"+separator+"]","g"),'').replace(/,/,'.'))||0;}
return val||0;};};sort.numeric=function(a,b){return sort.numeric.convert(a)-sort.numeric.convert(b);};sort.numeric.convert=sort.numeric_converter(".");sort.numeric_comma=function(a,b){return sort.numeric_comma.convert(a)-sort.numeric_comma.convert(b);};sort.numeric_comma.convert=sort.numeric_converter(",");sort.ignorecase=function(a,b){return sort.alphanumeric(sort.ignorecase.convert(a),sort.ignorecase.convert(b));};sort.ignorecase.convert=function(val){if(val==null){return"";}
return(""+val).toLowerCase();};sort.currency=sort.numeric;sort.currency_comma=sort.numeric_comma;sort.date=function(a,b){return sort.numeric(sort.date.convert(a),sort.date.convert(b));};sort.date.fixYear=function(yr){yr=+yr;if(yr<50){yr+=2000;}
else if(yr<100){yr+=1900;}
return yr;};sort.date.formats=[{re:/(\d{2,4})-(\d{1,2})-(\d{1,2})/,f:function(x){return(new Date(sort.date.fixYear(x[1]),+x[2],+x[3])).getTime();}},{re:/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/,f:function(x){return(new Date(sort.date.fixYear(x[3]),+x[1],+x[2])).getTime();}},{re:/(.*\d{4}.*\d+:\d+\d+.*)/,f:function(x){var d=new Date(x[1]);if(d){return d.getTime();}}}];sort.date.convert=function(val){var m,v,f=sort.date.formats;for(var i=0,L=f.length;i<L;i++){if(m=val.match(f[i].re)){v=f[i].f(m);if(typeof(v)!="undefined"){return v;}}}
return 9999999999999;};return sort;})();var Table=(function(){function def(o){return(typeof o!="undefined");};function hasClass(o,name){return new RegExp("(^|\\s)"+name+"(\\s|$)").test(o.className);};function addClass(o,name){var c=o.className||"";if(def(c)&&!hasClass(o,name)){o.className+=(c?" ":"")+name;}};function removeClass(o,name){var c=o.className||"";o.className=c.replace(new RegExp("(^|\\s)"+name+"(\\s|$)"),"$1");};function classValue(o,prefix){var c=o.className;if(c.match(new RegExp("(^|\\s)"+prefix+"([^ ]+)"))){return RegExp.$2;}
return null;};function isHidden(o){if(window.getComputedStyle){var cs=window.getComputedStyle;return(isHidden=function(o){return'none'==cs(o,null).getPropertyValue('display');})(o);}
else if(window.currentStyle){return(isHidden=function(o){return'none'==o.currentStyle['display'];})(o);}
return(isHidden=function(o){return'none'==o.style['display'];})(o);};function getParent(o,a,b){if(o!=null&&o.nodeName){if(o.nodeName==a||(b&&o.nodeName==b)){return o;}
while(o=o.parentNode){if(o.nodeName&&(o.nodeName==a||(b&&o.nodeName==b))){return o;}}}
return null;};function copy(o1,o2){for(var i=2;i<arguments.length;i++){var a=arguments[i];if(def(o1[a])){o2[a]=o1[a];}}}
var table={AutoStripeClassName:"table-autostripe",StripeClassNamePrefix:"table-stripeclass:",AutoSortClassName:"table-autosort",AutoSortColumnPrefix:"table-autosort:",AutoSortTitle:"Click to sort",SortedAscendingClassName:"table-sorted-asc",SortedDescendingClassName:"table-sorted-desc",SortableClassName:"table-sortable",SortableColumnPrefix:"table-sortable:",NoSortClassName:"table-nosort",AutoFilterClassName:"table-autofilter",FilteredClassName:"table-filtered",FilterableClassName:"table-filterable",FilteredRowcountPrefix:"table-filtered-rowcount:",RowcountPrefix:"table-rowcount:",FilterAllLabel:"Filter: All",AutoPageSizePrefix:"table-autopage:",AutoPageJumpPrefix:"table-page:",PageNumberPrefix:"table-page-number:",PageCountPrefix:"table-page-count:"};table.tabledata={};table.uniqueId=1;table.resolve=function(o,args){if(o!=null&&o.nodeName&&o.nodeName!="TABLE"){o=getParent(o,"TABLE");}
if(o==null){return null;}
if(!o.id){var id=null;do{var id="TABLE_"+(table.uniqueId++);}
while(document.getElementById(id)!=null);o.id=id;}
this.tabledata[o.id]=this.tabledata[o.id]||{};if(args){copy(args,this.tabledata[o.id],"stripeclass","ignorehiddenrows","useinnertext","sorttype","col","desc","page","pagesize");}
return o;};table.processTableCells=function(t,type,func,arg){t=this.resolve(t);if(t==null){return;}
if(type!="TFOOT"){this.processCells(t.tHead,func,arg);}
if(type!="THEAD"){this.processCells(t.tFoot,func,arg);}};table.processCells=function(section,func,arg){if(section!=null){if(section.rows&&section.rows.length&&section.rows.length>0){var rows=section.rows;for(var j=0,L2=rows.length;j<L2;j++){var row=rows[j];if(row.cells&&row.cells.length&&row.cells.length>0){var cells=row.cells;for(var k=0,L3=cells.length;k<L3;k++){var cellsK=cells[k];func.call(this,cellsK,arg);}}}}}};table.getCellIndex=function(td){var tr=td.parentNode;var cells=tr.cells;if(cells&&cells.length){if(cells.length>1&&cells[cells.length-1].cellIndex>0){(this.getCellIndex=function(td){return td.cellIndex;})(td);}
for(var i=0,L=cells.length;i<L;i++){if(tr.cells[i]==td){return i;}}}
return 0;};table.nodeValue={'INPUT':function(node){if(def(node.value)&&node.type&&((node.type!="checkbox"&&node.type!="radio")||node.checked)){return node.value;}
return"";},'SELECT':function(node){if(node.selectedIndex>=0&&node.options){return node.options[node.selectedIndex].text;}
return"";},'IMG':function(node){return node.name||"";}};table.getCellValue=function(td,useInnerText){if(useInnerText&&def(td.innerText)){return td.innerText;}
if(!td.childNodes){return"";}
var childNodes=td.childNodes;var ret="";for(var i=0,L=childNodes.length;i<L;i++){var node=childNodes[i];var type=node.nodeType;if(type==1){var nname=node.nodeName;if(this.nodeValue[nname]){ret+=this.nodeValue[nname](node);}
else{ret+=this.getCellValue(node);}}
else if(type==3){if(def(node.innerText)){ret+=node.innerText;}
else if(def(node.nodeValue)){ret+=node.nodeValue;}}}
return ret;};table.tableHeaderIndexes={};table.getActualCellIndex=function(tableCellObj){if(!def(tableCellObj.cellIndex)){return null;}
var tableObj=getParent(tableCellObj,"TABLE");var cellCoordinates=tableCellObj.parentNode.rowIndex+"-"+this.getCellIndex(tableCellObj);if(def(this.tableHeaderIndexes[tableObj.id])){return this.tableHeaderIndexes[tableObj.id][cellCoordinates];}
var matrix=[];this.tableHeaderIndexes[tableObj.id]={};var thead=getParent(tableCellObj,"THEAD");var trs=thead.getElementsByTagName('TR');for(var i=0;i<trs.length;i++){var cells=trs[i].cells;for(var j=0;j<cells.length;j++){var c=cells[j];var rowIndex=c.parentNode.rowIndex;var cellId=rowIndex+"-"+this.getCellIndex(c);var rowSpan=c.rowSpan||1;var colSpan=c.colSpan||1;var firstAvailCol;if(!def(matrix[rowIndex])){matrix[rowIndex]=[];}
var m=matrix[rowIndex];for(var k=0;k<m.length+1;k++){if(!def(m[k])){firstAvailCol=k;break;}}
this.tableHeaderIndexes[tableObj.id][cellId]=firstAvailCol;for(var k=rowIndex;k<rowIndex+rowSpan;k++){if(!def(matrix[k])){matrix[k]=[];}
var matrixrow=matrix[k];for(var l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x";}}}}
return this.tableHeaderIndexes[tableObj.id][cellCoordinates];};table.sort=function(o,args){var t,tdata,sortconvert=null;if(typeof(args)=="function"){args={sorttype:args};}
args=args||{};if(!def(args.col)){args.col=this.getActualCellIndex(o)||0;}
args.sorttype=args.sorttype||Sort['default'];t=this.resolve(o,args);tdata=this.tabledata[t.id];if(def(tdata.lastcol)&&tdata.lastcol==tdata.col&&def(tdata.lastdesc)){tdata.desc=!tdata.lastdesc;}
else{tdata.desc=!!args.desc;}
if("undefined"!=typeof(SORT_CAND_COL)&&SORT_CAND_COL!=null){tdata.lastcol=parseInt(SORT_CAND_COL,10);tdata.col=parseInt(SORT_CAND_COL,10);}else if("undefined"!=typeof(SORT_CAND_COL_DEF)&&SORT_CAND_COL_DEF!=null){tdata.lastcol=SORT_CAND_COL_DEF;tdata.col=SORT_CAND_COL_DEF;}else tdata.lastcol=tdata.col;if("undefined"!=typeof(SORT_CAND_ORD)&&SORT_CAND_ORD!=null){if(SORT_CAND_ORD=='false'){tdata.lastdesc=false;tdata.desc=false;}else{tdata.lastdesc=true;tdata.desc=true;}}else if("undefined"!=typeof(SORT_CAND_ORD_DEF)&&SORT_CAND_ORD_DEF!=null){tdata.lastdesc=SORT_CAND_ORD_DEF;tdata.desc=SORT_CAND_ORD_DEF;}else tdata.lastdesc=!!tdata.desc;$.cookie(ODESK_COOKIE_PREFIX+'sort_cand_col',tdata.lastcol,{expires:365});$.cookie(ODESK_COOKIE_PREFIX+'sort_cand_ord',tdata.lastdesc,{expires:365});var sorttype=tdata.sorttype;if(typeof(sorttype.convert)=="function"){sortconvert=tdata.sorttype.convert;sorttype=Sort.alphanumeric;}
this.processTableCells(t,"THEAD",function(cell){if(hasClass(cell,this.SortableClassName)){removeClass(cell,this.SortedAscendingClassName);removeClass(cell,this.SortedDescendingClassName);if(tdata.col==table.getActualCellIndex(cell)&&(classValue(cell,table.SortableClassName))){addClass(cell,tdata.desc?this.SortedAscendingClassName:this.SortedDescendingClassName);}}});var bodies=t.tBodies;if(bodies==null||bodies.length==0){return;}
var newSortFunc=(tdata.desc)?function(a,b){return sorttype(b[0],a[0]);}:function(a,b){return sorttype(a[0],b[0]);};var useinnertext=!!tdata.useinnertext;var col=tdata.col;for(var i=0,L=bodies.length;i<L;i++){var tb=bodies[i],tbrows=tb.rows,rows=[];if(!hasClass(tb,table.NoSortClassName)){var cRow,cRowIndex=0;if(cRow=tbrows[cRowIndex]){do{if(rowCells=cRow.cells){var cellValue=(col<rowCells.length)?this.getCellValue(rowCells[col],useinnertext):null;if(sortconvert)cellValue=sortconvert(cellValue);rows[cRowIndex]=[cellValue,tbrows[cRowIndex]];}}while(cRow=tbrows[++cRowIndex])}
rows.sort(newSortFunc);cRowIndex=0;var displayedCount=0;var f=[removeClass,addClass];if(cRow=rows[cRowIndex]){do{tb.appendChild(cRow[1]);}while(cRow=rows[++cRowIndex])}}}
if(tdata.pagesize){this.page(t);}
else{if(tdata.stripeclass){this.stripe(t,tdata.stripeclass,!!tdata.ignorehiddenrows);}}};table.filter=function(o,filters,args){var cell;args=args||{};var t=this.resolve(o,args);var tdata=this.tabledata[t.id];if(!filters){tdata.filters=null;}
else{if(filters.nodeName=="SELECT"&&filters.type=="select-one"&&filters.selectedIndex>-1){filters={'filter':filters.options[filters.selectedIndex].value};}
if(filters.nodeName=="INPUT"&&filters.type=="text"){filters={'filter':"/^"+filters.value+"/"};}
if(typeof(filters)=="object"&&!filters.length){filters=[filters];}
for(var i=0,L=filters.length;i<L;i++){var filter=filters[i];if(typeof(filter.filter)=="string"){if(filter.filter.match(/^\/(.*)\/$/)){filter.filter=new RegExp(RegExp.$1);filter.filter.regex=true;}
else if(filter.filter.match(/^function\s*\(([^\)]*)\)\s*\{(.*)}\s*$/)){filter.filter=Function(RegExp.$1,RegExp.$2);}}
if(filter&&!def(filter.col)&&(cell=getParent(o,"TD","TH"))){filter.col=this.getCellIndex(cell);}
if((!filter||!filter.filter)&&tdata.filters){delete tdata.filters[filter.col];}
else{tdata.filters=tdata.filters||{};tdata.filters[filter.col]=filter.filter;}}
for(var j in tdata.filters){var keep=true;}
if(!keep){tdata.filters=null;}}
return table.scrape(o);};table.page=function(t,page,args){args=args||{};if(def(page)){args.page=page;}
return table.scrape(t,args);};table.pageJump=function(t,count,args){t=this.resolve(t,args);return this.page(t,(table.tabledata[t.id].page||0)+count,args);};table.pageNext=function(t,args){return this.pageJump(t,1,args);};table.pagePrevious=function(t,args){return this.pageJump(t,-1,args);};table.scrape=function(o,args){var col,cell,filterList,filterReset=false,filter;var page,pagesize,pagestart,pageend;var unfilteredrows=[],unfilteredrowcount=0,totalrows=0;var t,tdata,row,hideRow;args=args||{};t=this.resolve(o,args);tdata=this.tabledata[t.id];var page=tdata.page;if(def(page)){if(page<0){tdata.page=page=0;}
pagesize=tdata.pagesize||25;pagestart=page*pagesize+1;pageend=pagestart+pagesize-1;}
var bodies=t.tBodies;if(bodies==null||bodies.length==0){return;}
for(var i=0,L=bodies.length;i<L;i++){var tb=bodies[i];for(var j=0,L2=tb.rows.length;j<L2;j++){row=tb.rows[j];hideRow=false;if(tdata.filters&&row.cells){var cells=row.cells;var cellsLength=cells.length;for(col in tdata.filters){if(!hideRow){filter=tdata.filters[col];if(filter&&col<cellsLength){var val=this.getCellValue(cells[col]);if(filter.regex&&val.search){hideRow=(val.search(filter)<0);}
else if(typeof(filter)=="function"){hideRow=!filter(val,cells[col]);}
else{hideRow=(val!=filter);}}}}}
totalrows++;if(!hideRow){unfilteredrowcount++;if(def(page)){unfilteredrows.push(row);if(unfilteredrowcount<pagestart||unfilteredrowcount>pageend){hideRow=true;}}}
row.style.display=hideRow?"none":"";}}
if(def(page)){if(pagestart>=unfilteredrowcount){pagestart=unfilteredrowcount-(unfilteredrowcount%pagesize);tdata.page=page=pagestart/pagesize;for(var i=pagestart,L=unfilteredrows.length;i<L;i++){unfilteredrows[i].style.display="";}}}
this.processTableCells(t,"THEAD",function(c){((tdata.filters&&def(tdata.filters[table.getCellIndex(c)])&&hasClass(c,table.FilterableClassName))?addClass:removeClass)(c,table.FilteredClassName);});if(tdata.stripeclass){this.stripe(t);}
var pagecount=Math.floor(unfilteredrowcount/pagesize)+1;if(def(page)){if(tdata.container_number){tdata.container_number.innerHTML=page+1;}
if(tdata.container_count){tdata.container_count.innerHTML=pagecount;}}
if(tdata.container_filtered_count){tdata.container_filtered_count.innerHTML=unfilteredrowcount;}
if(tdata.container_all_count){tdata.container_all_count.innerHTML=totalrows;}
return{'data':tdata,'unfilteredcount':unfilteredrowcount,'total':totalrows,'pagecount':pagecount,'page':page,'pagesize':pagesize};};table.stripe=function(t,className,args){args=args||{};args.stripeclass=className;t=this.resolve(t,args);var tdata=this.tabledata[t.id];var bodies=t.tBodies;if(bodies==null||bodies.length==0){return;}
className=tdata.stripeclass;var f=[removeClass,addClass];for(var i=0,L=bodies.length;i<L;i++){var tb=bodies[i],tbrows=tb.rows,cRowIndex=0,cRow,displayedCount=0;if(cRow=tbrows[cRowIndex]){if(tdata.ignoreHiddenRows){do{f[displayedCount++%2](cRow,className);}while(cRow=tbrows[++cRowIndex])}
else{do{if(!isHidden(cRow)){f[displayedCount++%2](cRow,className);}}while(cRow=tbrows[++cRowIndex])}}}};table.getUniqueColValues=function(t,col){var values={},bodies=this.resolve(t).tBodies;for(var i=0,L=bodies.length;i<L;i++){var tbody=bodies[i];for(var r=0,L2=tbody.rows.length;r<L2;r++){values[this.getCellValue(tbody.rows[r].cells[col])]=true;}}
var valArray=[];for(var val in values){valArray.push(val);}
return valArray.sort();};table.auto=function(args){var cells=[],tables=document.getElementsByTagName("TABLE");var val,tdata;if(tables!=null){for(var i=0,L=tables.length;i<L;i++){var t=table.resolve(tables[i]);tdata=table.tabledata[t.id];if(val=classValue(t,table.StripeClassNamePrefix)){tdata.stripeclass=val;}
if(hasClass(t,table.AutoFilterClassName)){table.autofilter(t);}
if(val=classValue(t,table.AutoPageSizePrefix)){table.autopage(t,{'pagesize':+val});}
if((val=classValue(t,table.AutoSortColumnPrefix))||(hasClass(t,table.AutoSortClassName))){table.autosort(t,{'col':(val==null)?null:val});}
if(tdata.stripeclass&&hasClass(t,table.AutoStripeClassName)){table.stripe(t);}}
if("undefined"!=typeof(SORT_CAND_COL))SORT_CAND_COL=null;if("undefined"!=typeof(SORT_CAND_COL_DEF))SORT_CAND_COL_DEF=null;if("undefined"!=typeof(SORT_CAND_ORD))SORT_CAND_ORD=null;if("undefined"!=typeof(SORT_CAND_ORD_DEF))SORT_CAND_ORD_DEF=null;}};table.autosort=function(t,args){t=this.resolve(t,args);var tdata=this.tabledata[t.id];var oDeskColSortMode=[];var oDeskColSortType=null;this.processTableCells(t,"THEAD",function(c){var type=classValue(c,table.SortableColumnPrefix);if(type!=null){oDeskColSortMode=type.split(',',2);type=oDeskColSortMode[0]||"default";if(def(oDeskColSortMode[1])){if(oDeskColSortMode[1]=='asc')oDeskColSortType=false;else oDeskColSortType=true;}
addClass(c,table.SortableClassName);if(def(oDeskColSortMode[1]))c.onclick=Function("","Table.sort(this,{'sorttype':Sort['"+type+"'],'desc':"+oDeskColSortType+"})");else c.onclick=Function("","Table.sort(this,{'sorttype':Sort['"+type+"']})");if(args.col!=null){var re=new RegExp(/^(\d+):(\w+)$/i);var m=re.exec(args.col);if(m!=null){args.col=m[1];if('desc'==m[2])
{args.desc=true;}}
if(args.col==table.getActualCellIndex(c)){tdata.sorttype=Sort[type];args.sorttype=Sort[type];}}}});if(args.col!=null){table.sort(t,args);}};table.autopage=function(t,args){t=this.resolve(t,args);var tdata=this.tabledata[t.id];if(tdata.pagesize){this.processTableCells(t,"THEAD,TFOOT",function(c){var type=classValue(c,table.AutoPageJumpPrefix);if(type=="next"){type=1;}
else if(type=="previous"){type=-1;}
if(type!=null){c.onclick=Function("","Table.pageJump(this,"+type+")");}});if(val=classValue(t,table.PageNumberPrefix)){tdata.container_number=document.getElementById(val);}
if(val=classValue(t,table.PageCountPrefix)){tdata.container_count=document.getElementById(val);}
return table.page(t,0,args);}};table.cancelBubble=function(e){e=e||window.event;if(typeof(e.stopPropagation)=="function"){e.stopPropagation();}
if(def(e.cancelBubble)){e.cancelBubble=true;}};table.autofilter=function(t,args){args=args||{};t=this.resolve(t,args);var tdata=this.tabledata[t.id],val;table.processTableCells(t,"THEAD",function(cell){if(hasClass(cell,table.FilterableClassName)){var cellIndex=table.getCellIndex(cell);var colValues=table.getUniqueColValues(t,cellIndex);if(colValues.length>0){if(typeof(args.insert)=="function"){func.insert(cell,colValues);}
else{var sel='<select onchange="Table.filter(this,this)" onclick="Table.cancelBubble(event)" class="'+table.AutoFilterClassName+'"><option value="">'+table.FilterAllLabel+'</option>';for(var i=0;i<colValues.length;i++){sel+='<option value="'+colValues[i]+'">'+colValues[i]+'</option>';}
sel+='</select>';cell.innerHTML+="<br>"+sel;}}}});if(val=classValue(t,table.FilteredRowcountPrefix)){tdata.container_filtered_count=document.getElementById(val);}
if(val=classValue(t,table.RowcountPrefix)){tdata.container_all_count=document.getElementById(val);}};if(typeof(jQuery)!="undefined"){jQuery(table.auto);}
else if(window.addEventListener){window.addEventListener("load",table.auto,false);}
else if(window.attachEvent){window.attachEvent("onload",table.auto);}
return table;})();