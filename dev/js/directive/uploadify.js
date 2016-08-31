/**
 * 上传文件
 * @param  {[type]} 'caUploaderInput'                   [description]
 * @param  {[type]} ["uploadConfig"                     [description]
 * @param  {[type]} '$log'                              [description]
 * @param  {[type]} '$compile'                          [description]
 * @param  {[type]} function(uploadConfig,$log,$compile [description]
 * @return {[type]}                                     [description]
 */
app.directive('caUploaderInput', ["uploadConfig",'$log','$compile',function(uploadConfig,$log,$compile) {
  var directive = {
		restrict: 'A',
        transclude:false,
        replace:true,
		scope:{
            prefill:"@"
		},
		link: function(scope, element, attrs, ctrl) {
			$log.debug("Init caUploader");
            if(scope.prefill){
                scope.fileName=scope.prefill;
            }
            var setFileName = function(name){

                scope.fileName=name.name;
                scope.orgFileName=name.origName;
                scope.$apply();
            };
			$(element.find("input").first()).uploadify({
				'uploader'       : "/upload",
				'swf'      		 : "/js/uploadify/uploadify.swf",
				'cancelImg'      : '',
				'folder'         : "/images/uploads",
				'queueID'        : "queue",
				'auto'           : true,
				'multi'          : false,
				'buttonImg'		 : '',
				'width'			 : '117',
				'height'		 : '34',
				'onSelect'	     : function(e, q, f) {
                    $log.debug("On select");
                },
				'onError'     : function (event,ID,fileObj,errorObj) {
					alert(errorObj.type + ' Error: ' + errorObj.info);
				},
				'onUploadSuccess'	 : function(file,data,response) {
                    setFileName($.parseJSON(data));
				}
			});
		}
	};
	return directive;
}]);
