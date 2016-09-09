/**
 * 全局变量
 */

app.factory('globalConfig', ['$rootScope', function ($rootScope) {
    var avStatus = [{
        available: 'y',
        text: '正常'
    }, {
        available: 'n',
        text: '不正常'
    }];
    var modifyStatus = [{
        available: 'wait_audit',
        text: '待审核'
    }, {
        available: 'audit_pass',
        text: '审核通过'
    }, {
        available: 'audit_not_pass',
        text: '审核不通过'
    }, {
        available: 'deployed',
        text: '已部署'
    }, {
        available: 'modify',
        text: '变更'
    }, {
        available: 'create',
        text: '新建'
    }];
    var useStatus = [{
        available: 'y',
        text: '启用'
    }, {
        available: 'n',
        text: '停用'
    }];


    return {
        api: {
            //分页操作
            queryListByParentIdPerm:'/wlgfapi/permission/queryListByParentId',
            queryListByParentIdRole:'/wlgfapi/role/queryListByParentId',
            queryListByParentIdRes:'/wlgfapi/res/queryListByParentId',
            //批量操作
            stopLabel:'/wlgfapi/batch/stopLabel',//批量停止标签表
            startLabel:'/wlgfapi/batch/startLabel',//批量启用标签表
            deleLabel:'/wlgfapi/batch/deleLabel',//批量删除标签表
            stopOlineLabel:'/wlgfapi/batch/stopOlineLabel',//批量停止上线标签
            startOlineLabel:'/wlgfapi/batch/startOlineLabel',//批量启用上线标签
            delePlugins:'/wlgfapi/batch/delePlugins',//批量删除待审核控件
            deleExample:'/wlgfapi/batch/deleExample',//批量删除实例
            // 获取当前用户信息
            getUser: '/oss/user/getLoginUserInfo',
            createOrModifyLabelGroup: '/wlgfapi/label/createOrModifyLabelGroup', //   标签管理-新建标签组
            createLabel: '/wlgfapi/label/createLabel', // 标签管理-新建标签
            modifyLabel: '/wlgfapi/label/modifyLabel', // 标签管理-新建标签
            queryDbsByCategory: '/wlgfapi/meta/queryDbsByCategory', // 元数据配置-查询数据库配置
            getCreatingLabelGroup: '/wlgfapi/label/getCreatingLabelGroup', //查询当前用户创建中的标签组
            queryTablesByDbId: '/wlgfapi/meta/queryTablesByDbId', // 元数据配置-查询数据表配置
            queryViewColumn: '/wlgfapi/config/queryViewColumn', //查询字段筛选配置
            saveViewColumn: '/wlgfapi/config/saveViewColumn', //保存字段筛选配置
            queryLabelsSimple: '/wlgfapi/label/queryLabelsSimple', // 根据标签组ID查询标签概要清单
            queryByParentId: '/wlgfapi/res/queryByParentId', //资源管理-查询下属资源清单
            queryLabelGroupsAdvance: '/wlgfapi/label/queryLabelGroupsAdvance', //查询标签标管理列表
            queryLabelsAdvance: '/wlgfapi/label/queryLabelsAdvance', //查询标签中心列表
            getLabelInfoCount: '/wlgfapi/label/getLabelInfoCount', //获取标签展台数据
            getLabelCodeName:'/wlgfapi/label/getLabelCodeName',//获取中文名
            getLabelPath:'/wlgfapi/label/getLabelPath',//获取中文名
            //  queryLabelGroupsAdvance:'/wlgfapi/label/queryLabelGroupsAdvance',
            // queryTablesByDbId: '/wlgfapi/meta/queryTablesByDbId'  // 元数据配置-查询字段配置
            getLabelGroup: '/wlgfapi/label/getLabelGroup', //根据ID查询标签组
            queryLabelModifiesSimpleAdaptive: '/wlgfapi/label/queryLabelModifiesSimpleAdaptive', //   标签表-根据修改标签组ID查询修改的标签概要清单
            deploy: '/wlgfapi/label/deploy', //部署
            queryDbsByCategoryId: '/wlgfapi/meta/queryDbsByCategoryId', //元数据-查询数据库配置
            getLabel: '/wlgfapi/label/getLabel', // 标签表-根据ID查询标签
            getLabelByMetaColumnId: '/wlgfapi/label/getLabelByMetaColumnId', // 标签表-根据字段ID查询标签
            queryLabelsByLabelGroupId: '/wlgfapi/label/queryLabelsByLabelGroupId', ////获取字段标签所有数据，生成表格
            submitAudit: '/wlgfapi/label/submitAudit', //标签表-提交审核
            getLabelGroupModifyAdaptive: '/wlgfapi/label/getLabelGroupModifyAdaptive', //根据ID查询修改的标签组
            createLabelGroupModify: '/wlgfapi/label/createLabelGroupModify', //根据ID创建修改的标签组
            audit: '/wlgfapi/label/audit', //审核
            queryRoleByParentId: '/wlgfapi/role/queryByParentId', ////角色配置-根据父id查询子角色
            getRoleById: '/wlgfapi/role/get', //角色管理-按id查询角色
            sourceConfigModify: '/wlgfapi/res/modify', //修改资源信息
            sourceConfigById: '/wlgfapi/res/get', //根据id获取资源信息
            sourceConfigCreate: '/wlgfapi/res/create', //创建资源
            RoleConfigCreate: '/wlgfapi/role/create', //角色创建
            changeResGroup: '/wlgfapi/res/changeResGroup', //设为资源组
            getRoleTree: '/wlgfapi/role/getTree', //得到角色权限菜单树
            roleConfigModify: '/wlgfapi/role/modify', //修改角色
            resGetTree: '/wlgfapi/res/getTree', //查询资源树
            getCategoryTree : '/wlgfapi/res/getCategoryTree',
            getSmsCode: '/wlgfapi/sms/code/getCode', //查询资源树
            getLabelListTree:'/wlgfapi/res/getLabelListTree',//获取标签展台树

            //======权限str===================
            permissionGetTree: '/wlgfapi/permission/getTree', //查询权限树
            permissionQueryByParentId: '/wlgfapi/permission/queryByParentId', //查询权限下属清单
            permissionGet: '/wlgfapi/permission/get', //根据id获取权限
            permissionModify: '/wlgfapi/permission/modify', //修改权限
            permissionCreate: '/wlgfapi/permission/create', //添加权限
            permissionDelete: '/wlgfapi/permission/delete', //删除权限配置
            //======权限end===================
            queryPermissionCodes: '/wlgfapi/user/queryPermissionCodes', // 查询当前用户拥有的权限
            permissionQueryAllByRoleId: '/wlgfapi/permission/queryAllByRoleId', //根据id查询角色权限
            roleCreatePermissionRels: '/wlgfapi/role/createPermissionRels',
            getLabelModifyAdaptive: '/wlgfapi/label/getLabelModifyAdaptive', // 根据ID查询修改的标签（自适应）
            roleQueryMetaTableByRoleId: '/wlgfapi/role/queryMetaTableByRoleId', //查询用户数据表权限配置
            roleCreateMetaTableRels: '/wlgfapi/role/createMetaTableRels', //保存用户表权限配置
            dmsOssUserGetList: '/oss/user/getList', //查询用户列表
            ossUserGet: '/oss/user/get', //获取用户管理中的用户信息
            userQueryAll: '/wlgfapi/user/queryAll', //查询用户管理列表
            userCreateUserRoleRel: '/wlgfapi/user/createUserRoleRel', //保存用户管理角色信息配置
            uploadFile: '/wlgfapi/file/upload', // 上传文件
            downloadFile: '/wlgfapi/file', // 下载文件
            //======可视化控件===================
            createWidget:'/wlgfapi/widget/createWidgetSample',//新建控件实例
            getWidget:'/wlgfapi/widget/getWidgetSample',//根据实例id查询实例
            modifyWidget:'/wlgfapi/widget/modifyWidgetSample',//修改控件实例
            deleteWidget:'/wlgfapi/widget/deleteWidgetSample',//删除控件实例
            widgetList:'/wlgfapi/widget/queryWidgetSampleAdvance',//控件实例列表
            widgetSimpleList: '/wlgfapi/widget/queryAllWidgetSimple', //查询控件名列表
            getres: '/wlgfapi/file/res', // 获取资源
            createmyWidget: '/wlgfapi/widget/createWidget',  // 控件-新建
            widgetListById: '/wlgfapi/widget/queryAllByWidgetId',  // 根据控件查询实例列表
            queryWidgetModifyAdvance: '/wlgfapi/widget/queryWidgetModifyAdvance',  // 查询待审核控件清单
            queryWidgetAdvance: '/wlgfapi/widget/queryWidgetAdvance',  // 查询已审核控件清单
            getWidgetForEdit: '/wlgfapi/widget/getWidget',  // 根据ID查询控件正式记录
            modifyWidgetF: '/wlgfapi/widget/modifyWidget',  // 根据ID查询控件正式记录
            auditWidget: '/wlgfapi/widget/audit',  // 控件-审核
            getWidgetModifyAdaptive: '/wlgfapi/widget/getWidgetModifyAdaptive',  // 根据变更ID查询控件变更记录
            deleteWidgetModify: '/wlgfapi/widget/deleteWidgetModify',  // 根据变更ID删除变更记录
            verityByName: '/wlgfapi/widget/verityByName',  // 根据实例名查询是否存在
            queryThumbnailFileAdvance:'/wlgfapi/widget/queryThumbnailFileAdvance', //获取缩略图清单
            verityByWidgetName:'/wlgfapi/widget/verityByWidgetName',// 根据控件名查询是否存在

        //  API接口
            queryApiList:'/wlgfapi/api/queryApiList',// 查询api
            queryApiTree:'/wlgfapi/apiBooths/getTree',//api展台树
            queryApiBoothList:'/wlgfapi/apiBooths/getApiByTreeId',//api展台列表
            queryApiDetail:'/wlgfapi/apiBooths/getApiInfo',//api详情

            //  API接口
            queryApiList:'/wlgfapi/api/queryApiList',// 查询api
            createApi:'/wlgfapi/apiInfo/create'
        },
        tables: {
            tagCenter: {
                headerRowHeight: 35,
                columns: [{
                    display: '数据表',
                    name: 'metaTableName',
                    // enabledEdit:true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.metaTableName) + '">' + $rootScope.escapeHtml(item.metaTableName) + '</span>';
                    }
                }, {
                    display: '数据库',
                    name: 'metaDbName',
                    // width:140,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.metaDbName) + '">' + $rootScope.escapeHtml(item.metaDbName) + '</span>';
                    }
                }, {
                    display: '标签数据类型',
                    name: 'dataCategory',
                    hide: true,
                    render: function (rowdata) {
                        if (rowdata.dataCategoryName != null) {
                            return $rootScope.escapeHtml(rowdata.dataCategoryName)
                        } else {
                            return $rootScope.escapeHtml(rowdata.dataCategory)
                        }
                    }
                }, {
                    display: '更新周期',
                    name: 'refreshCycle',
                    render: function (rowdata) {
                        if (rowdata.refreshCycleName != null) {
                            return $rootScope.escapeHtml(rowdata.refreshCycleName)
                        } else {
                            return $rootScope.escapeHtml(rowdata.refreshCycle)
                        }
                    }
                }, {
                    display: '数据来源',
                    name: 'dataSource',
                    // width:120,
                    render: function (rowdata) {
                        if (rowdata.dataSourceName != null) {
                            return $rootScope.escapeHtml(rowdata.dataSourceName)
                        } else {
                            return $rootScope.escapeHtml(rowdata.dataSource)
                        }
                    }
                }, {
                    display: '审核状态',
                    name: 'modifyStatus',
                    // width:120,
                    editor: {
                        type: 'select',
                        data: modifyStatus,
                        valueField: 'available',
                        textField: 'text'
                    },
                    render: function (item) {
                        for (var i = 0; i < modifyStatus.length; i++) {
                            if (modifyStatus[i]['available'] == item.modifyStatus)
                                return modifyStatus[i]['text']
                        }
                        return $rootScope.escapeHtml(item.modifyStatus);
                    }
                }, {
                    display: '使用状态',
                    name: 'useStatus',
                    // width:100,
                    editor: {
                        type: 'select',
                        data: useStatus,
                        valueField: 'available'
                    },
                    render: function (item) {
                        if (item.useStatus == 'y') return '启用';
                        return '停用';
                    }
                }, {
                    display: '表状态',
                    name: 'available',
                    hide: true,
                    editor: {
                        type: 'select',
                        data: avStatus,
                        valueField: 'available'
                    },
                    render: function (item) {
                        if (item.available == 'y') return '正常';
                        return '不正常';
                    }
                }, {
                    display: '已部署脚本',
                    name: 'scriptFileName',
                    align:'left',
                    render: function (rowdata) {

                        var h = '';
                        if (rowdata.scriptFileName == null) {
                            return h;
                        }
                        if (rowdata.scriptFileUid == null) {
                            h += "<a href='javascript:;' >" + $rootScope.escapeHtml(rowdata.scriptFileName) + "</a> ";
                            return h;
                        }
                        h += "<a title='" + $rootScope.escapeHtml(rowdata.scriptFileName) + "' href='/wlgfapi/file/" + rowdata.scriptFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.scriptFileName) + "</a> ";
                        return h;

                    }
                }, {
                    display: '附件',
                    name: 'attachmentFileName',
                    align:'left',
                    hide: true,
                    render: function (rowdata) {
                        var h = '';
                        if (rowdata.attachmentFileName == null) {
                            rowdata.attachmentFileName = ''
                        }else{
                            h += "<a title='" + $rootScope.escapeHtml(rowdata.attachmentFileName) + "' href='/wlgfapi/file/" + rowdata.attachmentFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.attachmentFileName) + "</a> ";
                        }
                        return h;

                    }
                }, {
                    display: '待审核脚本',
                    align:'left',
                    hide: true,
                    name: 'waitAuditScriptFileName',
                    render: function (rowdata) {
                        var h = '';
                        if (rowdata.waitAuditScriptFileName == null) {
                            return h;
                        }
                        if (rowdata.waitAuditScriptFileUid == null) {
                            h += "<a href='javascript:;' >" + $rootScope.escapeHtml(rowdata.waitAuditScriptFileName) + "</a> ";
                            return h;
                        }
                        h += "<a href='/wlgfapi/file/" + rowdata.waitAuditScriptFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.waitAuditScriptFileName) + "</a> ";
                        return h;

                    }
                }, {
                    display: '部署服务器',
                    name: 'deployServer',
                    hide: true,
                    render: function (rowdata) {
                        if (rowdata.deployServerName != null) {
                            return $rootScope.escapeHtml(rowdata.deployServerName)
                        } else {
                            return $rootScope.escapeHtml(rowdata.deployServer)
                        }

                    }
                }, {
                    display: '部署目录',
                    name: 'deployPath',
                    hide: true,
                    render: function (rowdata) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.deployPath) + '">' + $rootScope.escapeHtml(rowdata.deployPath) + '</span>';
                    }
                }, {
                    display: '启动命令',
                    name: 'startScriptFileName',
                    hide: true,
                    render: function (rowdata) {
                        var h = '';
                        if (rowdata.startScriptFileName == null) {
                            return h;
                        }
                        if (rowdata.startScriptFileUid == null) {
                            h += "<a href='javascript:;' >" + $rootScope.escapeHtml(rowdata.startScriptFileName) + "</a> ";
                            return h;
                        }
                        h += "<a href='/wlgfapi/file/" + rowdata.startScriptFileUid + "?ticket=" + Cookies.get('auth') + "' target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.startScriptFileName) + "</a> ";
                        return h;

                    }
                }, {
                    display: '标签类目',
                    name: 'category',
                    hide: true,
                    render: function (rowdata) {
                        if (rowdata.category != null) {
                            return $rootScope.escapeHtml(rowdata.category)
                        }
                    }
                }, {
                    display: '表说明',
                    name: 'comment',
                    hide: true,
                    render: function (rowdata) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.comment) + '">' + $rootScope.escapeHtml(rowdata.comment) + '</span>';
                    }
                }, {
                    display: '创建人',
                    name: 'createdUserName',
                    hide: true
                }, {
                    display: '修改人',
                    hide: true,
                    name: 'modifiedUserName'
                }, {
                    display: '创建时间',
                    hide: true,
                    name: 'created'
                }, {
                    display: '修改时间',
                    hide: true,
                    name: 'modified'
                }, {
                    display:'操作<i class="cz_ico">',
                    isSort: false,
                    align: 'center',
                    // width: 100,
                    frozen: true,
                    render: function (rowdata, rowindex, value) {
                        return "<a >...</a>";
                    }
                }]
            }
        },
        tablesCenter: {
            tagCenter: {
                headerRowHeight: 35,
                columns:[{
                    display: '标签中文名',
                    name: 'name',
                    hide: true,
                    render: function (rowdata) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.name) + '">' + $rootScope.escapeHtml(rowdata.name) + '</span>';
                    }
                }, {
                    display: '标签英文名',
                    name: 'metaColumnName',
                    render: function (rowdata) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.metaColumnName) + '">' + $rootScope.escapeHtml(rowdata.metaColumnName) + '</span>';
                    }
                }, {
                    display: '标签数据类型',
                    name: 'dataCategory',
                    hide: true,
                    render: function (rowdata) {
                        if (rowdata.dataCategoryName != null) {
                            return '<span title="' + $rootScope.escapeHtml(rowdata.dataCategoryName) + '">' + $rootScope.escapeHtml(rowdata.dataCategoryName) + '</span>';
                        } else {
                            return '<span title="' + $rootScope.escapeHtml(rowdata.dataCategory) + '">' + $rootScope.escapeHtml(rowdata.dataCategory) + '</span>';
                        }
                    }
                }, {
                    display: '标签类型',
                    name: 'type',
                    render: function (rowdata) {
                        if (rowdata.typeName != null) {
                            return '<span title="' + $rootScope.escapeHtml(rowdata.typeName) + '">' + $rootScope.escapeHtml(rowdata.typeName) + '</span>';
                        } else {
                            return '<span title="' + $rootScope.escapeHtml(rowdata.type) + '">' + $rootScope.escapeHtml(rowdata.type) + '</span>';
                        }
                    }
                }, {
                    display: '标签类目',
                    name: 'categoryPath',
                    render: function (rowdata) {
                        if (rowdata.categoryPath != null) {
                            return '<span title="' + $rootScope.escapeHtml(rowdata.categoryPath) + '">' + $rootScope.escapeHtml(rowdata.categoryPath) + '</span>';
                        }
                    }
                }, {
                    display: '标签等级',
                    name: 'labelLevel',
                    // width: 220,
                    render: function (rowdata) {
                        if (rowdata.labelLevel != null) {
                            if (rowdata.labelLevel == 1) {
                                return '<span title="一级标签">一级标签</span>';
                            } else {
                                return '<span title="二级标签">二级标签</span>';
                            };
                        }
                    }
                }, {
                    display: '是否为事实标签',
                    name: 'isFact',
                    render: function (rowdata) {
                        if(rowdata.isFact != null){
                            if (rowdata.isFact == "n") {
                                return $rootScope.escapeHtml("否")
                            } else {
                                return $rootScope.escapeHtml("是")
                            };
                        };
                    }
                }, {
                    display: '标签非空率',
                    name: 'labelQuality',
                    render: function (rowdata) {
                        if(rowdata.labelQuality != null){
                            return '<span title="' + rowdata.labelQuality.toFixed(2) + '%">' + $rootScope.escapeHtml(rowdata.labelQuality.toFixed(2)) + '%</span>';
                        };
                    }
                }, {
                    display: '审核状态',
                    name: 'modifyStatus',
                    hide: true,
                    editor: {
                        type: 'select',
                        data: modifyStatus,
                        valueField: 'available',
                        textField: 'text'
                    },
                    render: function (item) {
                        for (var i = 0; i < modifyStatus.length; i++) {
                            if (modifyStatus[i]['available'] == item.modifyStatus)
                                return modifyStatus[i]['text']
                        }
                        return '<span title="' + $rootScope.escapeHtml(rowdata.modifyStatus) + '">' + $rootScope.escapeHtml(rowdata.modifyStatus) + '</span>';
                    }
                }, {
                    display: '使用状态',
                    name: 'useStatus',
                    hide: true,
                    editor: {
                        type: 'select',
                        data: useStatus,
                        valueField: 'available'
                    },
                    render: function (item) {
                        if (item.useStatus == 'y') return '启用';
                        return '停用';
                    }
                }, {
                    display: '统计口径',
                    name: 'description',
                    hide: true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.metaTableName) + '">' + $rootScope.escapeHtml(item.metaTableName) + '</span>';
                    }
                }, {
                    display: '数据库',
                    name: 'metaDbName',
                    hide: true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.metaDbName) + '">' + $rootScope.escapeHtml(item.metaDbName) + '</span>';
                    }
                }, {
                    display: '标签表',
                    name: 'metaTableName',
                    hide: true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.metaTableName) + '">' + $rootScope.escapeHtml(item.metaTableName) + '</span>';
                    }
                }, {
                    display: '字段名',
                    name: 'metaColumnName',
                    hide: true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.metaColumnName) + '">' + $rootScope.escapeHtml(item.metaColumnName) + '</span>';
                    }
                }, {
                    display: '更新周期',
                    name: 'refreshCycle',
                    hide: true,
                    render: function (rowdata) {
                        if (rowdata.refreshCycleName != null) {
                            return rowdata.refreshCycleName
                        } else {
                            return rowdata.refreshCycle
                        }
                    }
                }, {
                    display: '数据源',
                    name: 'dataSource',
                    hide: true,
                    render: function (rowdata) {
                        if (rowdata.dataSourceName != null) {
                            return '<span title="' + $rootScope.escapeHtml(rowdata.dataSourceName) + '">' + $rootScope.escapeHtml(rowdata.dataSourceName) + '</span>';
                        } else {
                            return '<span title="' + $rootScope.escapeHtml(rowdata.dataSource) + '">' + $rootScope.escapeHtml(rowdata.dataSource) + '</span>';
                        }
                    }
                }, {
                    display: '创建人',
                    name: 'createdUserName',
                    hide: true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.createdUserName) + '">' + $rootScope.escapeHtml(item.createdUserName) + '</span>';
                    }
                }, {
                    display: '修改人',
                    name: 'modifiedUserName',
                    hide: true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.modifiedUserName) + '">' + $rootScope.escapeHtml(item.modifiedUserName) + '</span>';
                    }
                }, {
                    display: '创建时间',
                    name: 'created',
                    width: 130,
                    hide: true,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.created) + '">' + $rootScope.escapeHtml(item.created) + '</span>';
                    }
                }, {
                    display: '修改时间',
                    width: 130,
                    hide: true,
                    name: 'modified',
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.modified) + '">' + $rootScope.escapeHtml(item.modified) + '</span>';
                    }
                }, {
                    display:'操作<i class="cz_ico">',
                    isSort: false,
                    // width: 100,
                    frozen:true,
                    render: function (rowdata, rowindex, value) {
                        // var h = "";
                        // if ($rootScope.checkListPermission('metacenter.status')) {
                        //     if (rowdata.useStatus == 'y') {
                        //         h += "<a href='javascript:stopOrStartTag(" + rowdata.id + ',"' + rowdata.useStatus + '"' + ")'>停用</a> ";
                        //     } else {
                        //         h += "<a href='javascript:stopOrStartTag(" + rowdata.id + ',"' + rowdata.useStatus + '"' + ")'>启用</a> ";
                        //     }
                        // }
                        return "<a >...</a>";
                    }
                }]
            }
        },
        tablesConfig: {
            tagCenter: {
                headerRowHeight: 35,
                columns: [{
                    display: 'ID',
                    width: 100,
                    name: 'id'
                }, {
                    display: '中文名称',
                    name: 'name',
                    width: 100,
                    render: function (item) {
                        return '<span title="' + $rootScope.escapeHtml(item.name) + '">' + $rootScope.escapeHtml(item.name) + '</span>';
                    }
                }, {
                    display: '英文名称',
                    width: 115,
                    name: 'code'
                }, {
                    display: '父节点',
                    width: 100,
                    name: 'parentId'
                }, {
                    display: '状态',
                    width: 100,
                    name: 'status',
                    editor: {
                        type: 'select',
                        data: status,
                        valueField: 'available'
                    },
                    render: function (item) {
                        if (item.status == 'y') return '启用';
                        return '停用';
                    }
                }, {
                    display: '说明',
                    width: 120,
                    name: 'comment',
                    render: function (rowdata) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.comment) + '">' + $rootScope.escapeHtml(rowdata.comment) + '</span>';
                    }
                },


                    {
                        display:'操作<i class="cz_ico">',
                        isSort: false,
                        frozen:true,
                        width: 200,
                        render: function (rowdata) {
                            // var h = "";
                            // if ($rootScope.checkListPermission('permissions.role.modify')) {
                            //     h += "<a href='javascript:updateRole(" + rowdata.id + ")'>编辑</a> ";
                            // }
                            // if ($rootScope.checkListPermission('permissions.role.set')) {
                            //     h += "<a href='javascript:goPermissionsPage(" + rowdata.id + "," + rowdata.parentId + ")'>配置权限</a>";
                            // }
                            return "<a >...</a>";
                        }

                    }
                ]
            }

        },
        pluginsList: {
          pre: {
            headerRowHeight: 35,
            columns: [{
                display: 'ID',
                name: 'targetId',
                width: 100
            },{
                display: '标准控件名称',
                name: 'name',
                width: 250,
                render: function (rowdata) {
                        return '<span title="'+rowdata.name+'">' + $rootScope.escapeHtml(rowdata.name) + '</span>';
                }
            },{
                display: '审核状态',
                name: 'modifyStatus',
                width: 150,
                hide: true,
                render: function (row) {
                  var s = '';
                  if (row.modifyStatus == 'wait_audit'){
                    s = '待审核';
                  } else if (row.modifyStatus == 'audit_pass') {
                    s = '审核通过';
                  }else if (row.modifyStatus == 'audit_not_pass') {
                    s = '审核未通过';
                  }
                  return s;
                }
            },{
                display: '控件分类',
                name: 'widgetCatName',
                width: 150
            },{
                display: '底层库',
                name: 'widgetLibNames',
                width: 200
            },{
                display: '扩展插件',
                name: 'pluginFileName',
                width: 200,
                align:'left',
                render: function(rowdata) {
                	var h="";
                	if(rowdata!=''){
                var h = "<a href='/wlgfapi/file/" + rowdata.pluginFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.pluginFileName) + "</a> ";
                		
                	}

                    return h;
                }
            },{
                display: '开发文档',
                name: 'docFileName',
                width: 200,
                align:'left',
                render: function(rowdata) {
                    var h = "<a href='/wlgfapi/file/" + rowdata.docFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.docFileName) + "</a> ";
                    return h;
                }
            },{
                display: '附加样式',
                name: 'styleFileName',
                hide: true,
                width: 120,
                align:'left',
                render: function(rowdata) {
                	var h="";
                	if(rowdata.styleFileName!=null||rowdata.styleFileName==''){
                     h = "<a href='/wlgfapi/file/" + rowdata.styleFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.styleFileName) + "</a> ";
                	}
                    return h;
                }
            },{
                display: '审核意见',
                name: 'auditComment',
                hide: true,
                width: 200,
                render: function (rowdata) {
                        return '<span>' + $rootScope.escapeHtml(rowdata.auditComment) + '</span>';
                }
            },{
                display: '最近修改人',
                name: 'modifiedUserName',
                hide: true,
                width: 100
            },{
                display: '修改时间',
                name: 'modified',
                hide: true,
                width: 100,
                render: function (rowdata) {
                    return '<span title="'+rowdata.modified+'">' + rowdata.modified + '</span>';
                }
            },{
                display:'操作<i class="cz_ico">',
                isSort: false,
                width: 100,
                 frozen:true,
                render: function (rowdata) {
                //     var h = "";
                //     // if ($rootScope.checkListPermission('permissions.role.modify')) {
                //         h += "<a href='javascript:pluginPreCtrlPage(" + rowdata.id + ',"' + 1 + '"' + ")'>编辑</a> ";
                //     // }
                //     // if ($rootScope.checkListPermission('permissions.role.set')) {
                //     if (rowdata.modifyStatus == 'wait_audit') {
                //         h += "<a href='javascript:pluginPreCtrlPage(" + rowdata.targetId + ',"' + 2 + '"' + ")'>审核</a> ";
                //       }
                //
                //
                //     // }
                //     if (rowdata.useStatus != 'y') {
                //     h += "<a href='javascript:deletePlugin(" + rowdata.id + ',"' + 3 + '"' + ")'>删除</a>";
                // }
                    return "<a >...</a>";
                }

            }]
          },
          done: {
            headerRowHeight: 35,
            columns: [{
                display: 'ID',
                name: 'id',
                width: 100
            },{
                display: '标准控件名称',
                name: 'name',
                width: 200,
                render: function (rowdata) {
                        return '<span title="'+rowdata.name+'">' + $rootScope.escapeHtml(rowdata.name) + '</span>';
                }
            },{
                display: '审核状态',
                name: 'modifyStatus',
                width: 150,
                render: function (row) {
                  var s = '';
                  if (row.modifyStatus == 'wait_audit'){
                    s = '待审核';
                  } else if (row.modifyStatus == 'audit_pass') {
                    s = '审核通过';
                  }else if (row.modifyStatus == 'audit_not_pass') {
                    s = '审核未通过';
                  }
                  return s;
                }
            },{
                display: '控件分类',
                name: 'widgetCatName',
                width: 100
            },{
                display: '底层库',
                name: 'widgetLibNames',
                width: 150
            },{
                display: '扩展插件',
                name: 'pluginFileName',
                width: 200,
                align:'left',
                render: function(rowdata) {
                var h = "<a href='/wlgfapi/file/" + rowdata.pluginFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.pluginFileName) + "</a> ";
                    return h;
                }
            },{
                display: '开发文档',
                name: 'docFileName',
                width: 200,
                align:'left',
                render: function(rowdata) {
                    var h = "<a href='/wlgfapi/file/" + rowdata.docFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.docFileName) + "</a> ";
                    return h;
                }
            },{
                display: '附加样式',
                name: 'styleFileName',
                width: 120,
                hide: true,
                align:'left',
                render: function(rowdata) {
                   var h="";
                	if(rowdata.styleFileName!=null||rowdata.styleFileName==''){
                     h = "<a href='/wlgfapi/file/" + rowdata.styleFileUid + "?ticket=" + Cookies.get('auth') + "'  target='_blank'><span class='file-down-ico'></span>" + $rootScope.escapeHtml(rowdata.styleFileName) + "</a> ";
                	}
                	return h;
                }
            },{
                display: '最近修改人',
                name: 'modifiedUserName',
                hide: true,
                width: 100
            },{
                display: '修改时间',
                name: 'modified',
                hide: true,
                width: 100,
                render: function (rowdata) {
                    return '<span title="'+rowdata.modified+'">' + rowdata.modified + '</span>';
                }
            },{
                display:'操作<i class="cz_ico">',
                isSort: false,
                width: 100,
                 frozen:true,
                render: function (rowdata) {
                    // var h = "";
                    // // if ($rootScope.checkListPermission('permissions.role.modify')) {
                    //     h += "<a href='javascript:pluginDoneCtrlPage(" + rowdata.id + ',"' + 1 + '"' + ")'>编辑</a> ";
                    // // }
                    // // if ($rootScope.checkListPermission('permissions.role.set')) {
                    //     h += "<a target='_blank' href='/#/previewuploadplugin/"+rowdata.id+"'>预览</a> ";
                    // // }
                    return "<a >...</a>";
                }

            }]
          }
        },
        apiList: {
            columns: [{
                display: 'API英文名',
                name: 'name',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.name) + '">' + $rootScope.escapeHtml(item.name) + '</span>';
                }
            }, {
                display: 'API中文名',
                name: 'cname',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.cname) + '">' + $rootScope.escapeHtml(item.cname) + '</span>';
                }
            }, {
                display: 'API版本',
                name: 'version',
                hide: true,
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.version) + '">' + $rootScope.escapeHtml(item.version) + '</span>';
                }
            }, {
                display: 'API所属类目',
                name: 'category',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.category,'-') + '">' + $rootScope.escapeHtml(item.category,'-') + '</span>';
                }
            }, {
                display: 'API状态',
                name: 'status',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.status,'-') + '">' + $rootScope.escapeHtml(item.status,'-') + '</span>';
                }
            },
            {
                display: '创建人',
                name: 'createdUserName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.createdUserName,'-') + '">' + (item.createdUserName?$rootScope.escapeHtml(item.createdUserName,'-'):'我来认领') + '</span>';
                }
            }/*,
                {
                    display: '审核状态',
                    name: 'modifyStatus',
                    // width:120,
                    editor: {
                        type: 'select',
                        data: modifyStatus,
                        valueField: 'available',
                        textField: 'text'
                    },
                    render: function (item) {
                        for (var i = 0; i < modifyStatus.length; i++) {
                            if (modifyStatus[i]['available'] == item.modifyStatus)
                                return modifyStatus[i]['text']
                        }
                        return $rootScope.escapeHtml(item.modifyStatus);
                    }
                }*/
                , {
                    display:'操作<i class="cz_ico">',
                    isSort: false,
                    align: 'center',
                    frozen: true,
                    render: function (rowdata, rowindex, value) {
                        return "<a >...</a>";
                    }
                }]
        }

    };
}]);
