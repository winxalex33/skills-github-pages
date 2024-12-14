
var facebook={uid:null,cookie_type:null,callback:null,message:null,data:{},action_link:null,status:null,timer_id:null,ttl:null,delay_time:30,app_key:FB_APP_KEY,app_receiver:FB_APP_RECEIVER,app_init_par:null,resources_url:'http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php',img_to_check:'http://www.facebook.com/rsrc.php/z81XI/hash/5yqqx3il.gif',on_no_access:null,initiated:false,init:function(cb_func){if(typeof FB=='undefined'&&!facebook.initiated){facebook.check_access(facebook.img_to_check,function(){var body=document.getElementsByTagName("body")[0]||document.documentElement,fb_container=document.createElement("div");$(fb_container).css({position:'absolute',top:'-10000px',width:'0px',height:'0px'});fb_container.id='FB_HiddenContainer';body.insertBefore(fb_container,body.firstChild);loading_process('Loading Facebook resources...');load_script(facebook.resources_url,function(callback){loading_process();if(is_fb_access()&&!facebook.initiated){logger.say('Run FB_RequireFeatures');FB_RequireFeatures(["XFBML"],function(){FB.Facebook.init(facebook.app_key,facebook.app_receiver,facebook.app_init_par);logger.say('FB future initiated');facebook.initiated=true;});}
if(typeof callback=='function'){fire_callback(callback,[],true);}},[cb_func]);},function(){loading_process();if(typeof facebook.on_no_access=='function'){fire_callback(facebook.on_no_access,[],true);}else{alert("facebook.com is not accessible");}});}else{if(typeof cb_func=='function'){fire_callback(cb_func,[],true);}}},check_access:function(img_url,cb_func_ok,cb_func_er){if(!facebook.status){$('body').append('<img id="tmp_fb_loading_img" style="position:absolute;left:-10000px;top:-10000px" />');$('#tmp_fb_loading_img').load(function(){clearInterval(facebook.timer_id);$('#tmp_fb_loading_img').remove();facebook.status='loaded';if(typeof cb_func_ok=='function'){cb_func_ok();}
return true;});$('#tmp_fb_loading_img').error(function(){clearInterval(facebook.timer_id);$('#tmp_fb_loading_img').remove();facebook.status='not_loaded';if(typeof cb_func_er=='function'){cb_func_er();}
return false;});$('#tmp_fb_loading_img').attr('src',img_url+'?nc='+Math.random());facebook.status='loading';facebook.ttl=facebook.delay_time;}
if(facebook.status=='loading'&&facebook.ttl>=0){facebook.ttl=facebook.ttl-1;clearInterval(facebook.timer_id);facebook.timer_id=setTimeout(facebook.check_access,1000);}else{clearInterval(facebook.timer_id);$('#tmp_fb_loading_img').remove();if(facebook.status=='loaded'){return true;}else{facebook.status='not_loaded';if(typeof cb_func_er=='function'){cb_func_er();}
return false;}}},set_cookie:function(){$.cookie(ODESK_COOKIE_PREFIX+'fb_share_'+facebook.type+'_'+facebook.uid,1,{domain:ODESK_COOKIE_DOMAIN,path:'/'});var data={ajax:1};data['do']='fb_set_relation';$.post(ODESK_CONSOLE_ROOT+'extending_odesk.php',data,null,'json');},after_share:function(post_id,exception){facebook.set_cookie();if('function'==typeof facebook.callback){facebook.callback();}},share_test:function(uid,is_ort,exam_url,exam_title,test_title,percentile,score,max_score,icon,icon_href,log_obj,callback){var url=document.location.toString();if('object'==typeof log_obj){evt.log(log_obj);}
facebook.uid=uid;facebook.cookie_type='exam';facebook.callback=callback;facebook.action_link=[{"text":"View Exam","href":exam_url}];facebook.data={'name':exam_title,'href':exam_url,'caption':'{*actor*} has passed the '+test_title+' on oDesk','properties':{'Score':{'text':score+' out of '+max_score,'href':exam_url},'Rank':'better than '+percentile+'% of test takers'}};if(icon!=null&&icon!='undefined'){facebook.data['media']=[{'type':'image','src':icon,'href':icon_href}];}
facebook.share();return true;},share_job:function(uid,op_title,op_url,op_duration,op_budget,log_obj){if('object'==typeof log_obj){evt.log(log_obj);}
facebook.uid=uid;facebook.type='job';var descr='';if(!op_duration&&op_budget){descr='This is a fixed price job with a budget of $'+op_budget;}else{descr='This is an hourly job with a duration of '+op_duration;}
facebook.action_link=[{"text":"View Job","href":op_url}];facebook.data={'name':op_title,'href':op_url,'caption':'{*actor*} is hiring on oDesk','description':descr};facebook.share();return false;},share_profile:function(uid,profile_url,profile_title,short_overview,photo,photo_href,log_obj,callback){if('object'==typeof log_obj){evt.log(log_obj);}
facebook.uid=uid;facebook.callback=callback;if(short_overview){short_overview=escapeHTML(decode_entity(short_overview));}
if(profile_title){profile_title=escapeHTML(decode_entity(profile_title));facebook.action_link=[{"text":"View Profile","href":profile_url}];facebook.data={'name':profile_title,'href':profile_url,'caption':'{*actor*}\'s profile has been updated on oDesk','description':short_overview};}else{facebook.data={'name':'View my profile','href':profile_url,'caption':'{*actor*}\'s profile has been updated on oDesk','description':short_overview};}
if(photo!=''){facebook.data['media']=[{'type':'image','src':photo,'href':photo_href}];}
facebook.share();return false;},publish:function(){if(typeof FB=='undefined'){alert('Facebook Connect is not accessible.');}else{logger.say('Run FB.ensureInit');FB.ensureInit(function(){logger.say('Run FB.Connect.streamPublish');FB.Connect.streamPublish(facebook.message,facebook.data,facebook.action_link,null,null,facebook.after_share);});}},share:function(){facebook.init(facebook.publish);}};function is_fb_access(cont){var cookie_name=ODESK_COOKIE_PREFIX+'fb_access_error';if('function'==typeof(FB_RequireFeatures)){return true;}else{if($.cookie(cookie_name))return false;var error='<div class="alert warning" id="fb_access_error"><h2 style="padding-left:10px; background-image:none"><span class="icon warning-icn">&nbsp;</span><span class="close" style="float: right;">close</span>Facebook Connect is not accessible.</h2></div>';if(cont==null)cont='.pageBreadcrumb';$(cont).before(error);$('.close','#fb_access_error').click(function(){$('#fb_access_error').hide();$.cookie(cookie_name,1,{path:'/',domain:ODESK_COOKIE_DOMAIN});});return false;}}