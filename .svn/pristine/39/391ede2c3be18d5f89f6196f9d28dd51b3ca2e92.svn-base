/**
 * jQuery ligerUI 1.3.3 | ligercombobox
 */
! function(a) {
	a.fn.ligerComboBox = function() {
			return a.ligerui.run.call(this, "ligerComboBox", arguments)
		}, a.fn.ligerGetComboBoxManager = function() {
			return a.ligerui.run.call(this, "ligerGetComboBoxManager", arguments)
		}, a.ligerDefaults.ComboBox = {
			resize: !0,
			isMultiSelect: !1,
			isShowCheckBox: !1,
			columns: null,
			width: null,
			selectBoxWidth: null,
			selectBoxHeight: 120,
			selectBoxPosYDiff: -3,
			onBeforeSelect: !1,
			onAfterShowData: null,
			onSelected: null,
			initValue: null,
			value: null,
			initText: null,
			valueField: "id",
			textField: "text",
			dataParmName: null,
			valueFieldID: null,
			ajaxComplete: null,
			ajaxBeforeSend: null,
			ajaxContentType: null,
			slide: !1,
			split: ";",
			data: null,
			dataGetter: null,
			tree: null,
			treeLeafOnly: !0,
			condition: null,
			grid: null,
			onStartResize: null,
			onEndResize: null,
			hideOnLoseFocus: !0,
			hideGridOnLoseFocus: !1,
			url: null,
			urlParms: null,
			selectBoxRender: null,
			selectBoxRenderUpdate: null,
			detailEnabled: !0,
			detailUrl: null,
			detailPostIdField: null,
			detailDataParmName: null,
			detailParms: null,
			detailDataGetter: null,
			delayLoad: !1,
			triggerToLoad: !1,
			emptyText: null,
			addRowButton: "新增",
			addRowButtonClick: null,
			triggerIcon: null,
			onSuccess: null,
			onBeforeSetData: null,
			onError: null,
			onBeforeOpen: null,
			onButtonClick: null,
			onTextBoxKeyDown: null,
			onTextBoxKeyEnter: null,
			render: null,
			absolute: !0,
			cancelable: !0,
			css: null,
			parms: null,
			renderItem: null,
			autocomplete: !1,
			autocompleteAllowEmpty: !0,
			isTextBoxMode: !1,
			highLight: !1,
			readonly: !1,
			ajaxType: "post",
			alwayShowInTop: !1,
			alwayShowInDown: !1,
			valueFieldCssClass: null,
			isRowReadOnly: null,
			rowClsRender: null,
			keySupport: !1,
			initIsTriggerEvent: !1,
			conditionSearchClick: null,
			onChangeValue: null,
			delayLoadGrid: !0,
			setTextBySource: !0
		}, a.ligerDefaults.ComboBoxString = {
			Search: "搜索"
		}, a.ligerMethos.ComboBox = a.ligerMethos.ComboBox || {}, a.ligerui.controls.ComboBox = function(b, c) {
			a.ligerui.controls.ComboBox.base.constructor.call(this, b, c)
		}, a.ligerui.controls.ComboBox.ligerExtend(a.ligerui.controls.Input, {
			__getType: function() {
				return "ComboBox"
			},
			_extendMethods: function() {
				return a.ligerMethos.ComboBox
			},
			_init: function() {
				a.ligerui.controls.ComboBox.base._init.call(this);
				var b = this.options;
				b.columns && (b.isShowCheckBox = !0), b.isMultiSelect && (b.isShowCheckBox = !0), b.triggerToLoad && (b.delayLoad = !0)
			},
			_render: function() {
				var b = this,
					c = this.options;
				b.data = c.data, b.inputText = null, b.select = null, b.textFieldID = "", b.valueFieldID = "", b.valueField = null, a(this.element).is(":hidden") ? (b.valueField = a(this.element), b.textFieldID = c.textFieldID || this.element.id + "_txt", b.inputText = a('<input type="text" readonly="true"/>'), b.inputText.attr("id", b.textFieldID).insertAfter(a(this.element)), b.valueField.attr("validate") && (b.inputText.attr("validate", b.valueField.attr("validate")), b.valueField.removeAttr("validate")), b.valueField.attr("validateMessage") && (b.inputText.attr("validateMessage", b.valueField.attr("validateMessage")), b.valueField.removeAttr("validateMessage"))) : "input" == this.element.tagName.toLowerCase() ? (this.element.readOnly = !0, b.inputText = a(this.element), b.textFieldID = this.element.id) : "select" == this.element.tagName.toLowerCase() && (a(this.element).hide(), b.select = a(this.element), c.isMultiSelect = !1, c.isShowCheckBox = !1, c.cancelable = !1, b.textFieldID = c.textFieldID || this.element.id + "_txt", b.inputText = a('<input type="text" readonly="true"/>'), b.inputText.attr("id", b.textFieldID).insertAfter(a(this.element)), b.select.attr("validate") && (b.inputText.attr("validate", b.select.attr("validate")), b.select.removeAttr("validate")), b.select.attr("validateMessage") && (b.inputText.attr("validateMessage", b.select.attr("validateMessage")), b.select.removeAttr("validateMessage")), !c.value && this.element.value && (c.value = this.element.value)), void 0 == b.inputText[0].name && (b.inputText[0].name = b.textFieldID), b.inputText.attr("data-comboboxid", b.id), null == b.valueField && (c.valueFieldID ? (b.valueField = a("#" + c.valueFieldID + ":input,[name=" + c.valueFieldID + "]:input").filter("input:hidden"), 0 == b.valueField.length && (b.valueField = a('<input type="hidden"/>')), b.valueField[0].id = b.valueField[0].name = c.valueFieldID) : (b.valueField = a('<input type="hidden"/>'), b.valueField[0].id = b.valueField[0].name = b.textFieldID + "_val")), c.valueFieldCssClass && b.valueField.addClass(c.valueFieldCssClass), void 0 == b.valueField[0].name && (b.valueField[0].name = b.valueField[0].id), null != c.initValue && (b.valueField[0].value = c.initValue), b.valueField.attr("data-ligerid", b.id), b.link = a('<div class="l-trigger"><div class="l-trigger-icon"></div></div>'), c.triggerIcon && b.link.find("div:first").addClass(c.triggerIcon), b.selectBox = a('<div class="l-box-select" style="display:none"><div class="l-box-select-inner"><table cellpadding="0" cellspacing="0" border="0" class="l-box-select-table"></table></div></div>'), b.selectBox.table = a("table:first", b.selectBox), b.selectBoxInner = b.selectBox.find(".l-box-select-inner:first"), b.wrapper = b.inputText.wrap('<div class="l-text l-text-combobox"></div>').parent(), b.wrapper.append('<div class="l-text-l"></div><div class="l-text-r"></div>'), b.wrapper.append(b.link), b.textwrapper = b.wrapper.wrap('<div class="l-text-wrapper"></div>').parent(), c.absolute ? b.selectBox.appendTo("body").addClass("l-box-select-absolute") : b.textwrapper.append(b.selectBox), b.textwrapper.append(b.valueField), b.inputText.addClass("l-text-field"), c.isShowCheckBox && !b.select ? a("table", b.selectBox).addClass("l-table-checkbox") : (c.isShowCheckBox = !1, a("table", b.selectBox).addClass("l-table-nocheckbox")), b.link.hover(function() {
					c.disabled || c.readonly || (this.className = "l-trigger-hover")
				}, function() {
					c.disabled || c.readonly || (this.className = "l-trigger")
				}).mousedown(function() {
					c.disabled || c.readonly || (this.className = "l-trigger-pressed")
				}).mouseup(function() {
					c.disabled || c.readonly || (this.className = "l-trigger-hover")
				}).click(function() {
					return c.disabled || c.readonly ? void 0 : 0 == b.trigger("buttonClick") ? !1 : 0 == b.trigger("beforeOpen") ? !1 : (c.triggerToLoad && !b.triggerLoaded ? (b.triggerLoaded = !0, b._setUrl(c.url, function() {
						b._toggleSelectBox(b.selectBox.is(":visible"))
					})) : b._toggleSelectBox(b.selectBox.is(":visible")), void 0)
				}), b.inputText.click(function() {
					return c.disabled || c.readonly ? void 0 : 0 == b.trigger("beforeOpen") ? !1 : (c.autocomplete ? b.updateSelectBoxPosition() : c.triggerToLoad && !b.triggerLoaded ? (b.triggerLoaded = !0, b._setUrl(c.url, function() {
						b._toggleSelectBox(b.selectBox.is(":visible"))
					})) : b._toggleSelectBox(b.selectBox.is(":visible")), void 0)
				}).blur(function() {
					c.disabled || b.wrapper.removeClass("l-text-focus")
				}).focus(function() {
					c.disabled || c.readonly || b.wrapper.addClass("l-text-focus")
				}).change(function() {
					b.trigger("changeValue", [this.value])
				}), b.wrapper.hover(function() {
					c.disabled || c.readonly || b.wrapper.addClass("l-text-over")
				}, function() {
					c.disabled || c.readonly || b.wrapper.removeClass("l-text-over")
				}), b.resizing = !1, b.selectBox.hover(null, function() {
					c.hideOnLoseFocus && b.selectBox.is(":visible") && !b.boxToggling && !b.resizing && b._toggleSelectBox(!0)
				}), b.bulidContent(), b.set(c, null, "init"), c.selectBoxWidth ? b.selectBox.width(c.selectBoxWidth) : b.selectBox.css("width", b.wrapper.css("width")), c.grid && (c.delayLoadGrid ? b.bind("show", function() {
					b.grid || (b.setGrid(c.grid), b.set("SelectBoxHeight", c.selectBoxHeight))
				}) : b.grid || (b.setGrid(c.grid), b.set("SelectBoxHeight", c.selectBoxHeight))), b.updateSelectBoxPosition(), a(document).bind("click.combobox", function(c) {
					b.selectBox.is(":visible") && 0 == a(c.target || c.srcElement).closest(".l-box-select, .l-text-combobox").length && b._toggleSelectBox(!0)
				})
			},
			destroy: function() {
				this.wrapper && this.wrapper.remove(), this.selectBox && this.selectBox.remove(), this.options = null, a.ligerui.remove(this)
			},
			clear: function() {
				this._changeValue("", ""), a("a.l-checkbox-checked", this.selectBox).removeClass("l-checkbox-checked"), a("td.l-selected", this.selectBox).removeClass("l-selected"), a(":checkbox", this.selectBox).each(function() {
					this.checked = !1
				}), this.trigger("clear")
			},
			_setSelectBoxHeight: function(b) {
				var c, d, e;
				b && (c = this, d = this.options, d.grid ? c.grid && c.grid.set("height", c.getGridHeight(b)) : d.tree ? c.selectBoxInner.height(d.selectBoxHeight) : (e = a("tr", c.selectBox.table).length, !d.selectBoxHeight && 8 > e && (d.selectBoxHeight = 30 * e), d.selectBoxHeight && (8 > e ? c.selectBoxInner.height("auto") : c.selectBoxInner.height(d.selectBoxHeight))))
			},
			_setCss: function(a) {
				a && this.wrapper.addClass(a)
			},
			_setCancelable: function(b) {
				var c = this,
					d = this.options;
				!b && c.unselect && (c.unselect.remove(), c.unselect = null), (b || c.unselect) && (c.unselect = a('<div class="l-trigger l-trigger-cancel"><div class="l-trigger-icon"></div></div>').hide(), c.wrapper.hover(function() {
					c.unselect.show()
				}, function() {
					c.unselect.hide()
				}), d.disabled || d.readonly || !d.cancelable || c.wrapper.append(c.unselect), c.unselect.hover(function() {
					this.className = "l-trigger-hover l-trigger-cancel"
				}, function() {
					this.className = "l-trigger l-trigger-cancel"
				}).click(function() {
					c.clear()
				}))
			},
			_setDisabled: function(a) {
				a ? this.wrapper.addClass("l-text-disabled") : this.wrapper.removeClass("l-text-disabled")
			},
			_setReadonly: function(a) {
				a ? this.wrapper.addClass("l-text-readonly") : this.wrapper.removeClass("l-text-readonly")
			},
			_setLable: function(b) {
				var c = this,
					d = this.options;
				b && (c.labelwrapper ? c.labelwrapper.find(".l-text-label:first").html(b + ":&nbsp") : (c.labelwrapper = c.textwrapper.wrap('<div class="l-labeltext"></div>').parent(), c.labelwrapper.prepend('<div class="l-text-label" style="float:left;display:inline;">' + b + ":&nbsp</div>"), c.textwrapper.css("float", "left")), d.labelWidth ? a(".l-text-label", c.labelwrapper).outerWidth(d.labelWidth) : d.labelWidth = a(".l-text-label", c.labelwrapper).outerWidth(), a(".l-text-label", c.labelwrapper).width(d.labelWidth), a(".l-text-label", c.labelwrapper).height(c.wrapper.height()), c.labelwrapper.append('<br style="clear:both;" />'), d.labelAlign && a(".l-text-label", c.labelwrapper).css("text-align", d.labelAlign), c.textwrapper.css({
					display: "inline"
				}), c.labelwrapper.width(c.wrapper.outerWidth() + d.labelWidth + 2))
			},
			_setWidth: function(a) {
				var b = this,
					c = this.options;
				a > 20 && (b.wrapper.css({
					width: a
				}), b.inputText.css({
					width: a - 20
				}), c.selectBoxWidth || b.selectBox.css({
					width: a
				}))
			},
			_setHeight: function(a) {
				var b = this;
				a > 10 && (b.wrapper.height(a), b.inputText.height(a - 2))
			},
			_setResize: function(b) {
				var e, c = this,
					d = this.options;
				d.columns || b && a.fn.ligerResizable && (e = d.selectBoxHeight ? "e" : "se,s,e", c.selectBox.ligerResizable({
					handles: e,
					onStartResize: function() {
						c.resizing = !0, c.trigger("startResize")
					},
					onEndResize: function() {
						return c.resizing = !1, 0 == c.trigger("endResize") ? !1 : void 0
					},
					onStopResize: function(a) {
						return c.grid ? (a.newWidth && c.selectBox.width(a.newWidth), a.newHeight && c.set({
							selectBoxHeight: a.newHeight
						}), c.grid.refreshSize(), c.trigger("endResize"), !1) : !0
					}
				}), c.selectBox.append("<div class='l-btn-nw-drop'></div>"))
			},
			findTextByValue: function(b) {
				var e, f, g, c = this,
					d = this.options;
				return null == b ? "" : (e = "", f = function(a) {
					var e, c = b.toString().split(d.split);
					for(e = 0; e < c.length; e++)
						if(c[e] == a && "" != c[e]) return !0;
					return !1
				}, g = c.options.grid && c.options.grid.data ? c.options.grid.data.Rows : c.data, a(g).each(function(a, b) {
					var c = b[d.valueField],
						g = b[d.textField];
					f(c) && (e += g + d.split)
				}), e.length > 0 && (e = e.substr(0, e.length - 1)), e)
			},
			findValueByText: function(b) {
				var e, f, c = this,
					d = this.options;
				return b || "" != b ? (e = function(a) {
					var e, c = b.toString().split(d.split);
					for(e = 0; e < c.length; e++)
						if(c[e] == a) return !0;
					return !1
				}, f = "", a(c.data).each(function(a, b) {
					var c = b[d.valueField],
						g = b[d.textField];
					e(g) && (f += c + d.split)
				}), f.length > 0 && (f = f.substr(0, f.length - 1)), f) : ""
			},
			insertItem: function(a, b) {
				var c = this;
				this.options, c.data = c.data || [], c.data.splice(b, 0, a), c.setData(c.data)
			},
			addItem: function(a) {
				var b = this;
				this.options, b.insertItem(a, (b.data || []).length)
			},
			_setIsTextBoxMode: function(a) {
				var b = this;
				this.options, a && b.inputText.removeAttr("readonly")
			},
			_setValue: function(b, c) {
				var h, i, d = this,
					e = this.options,
					f = !1,
					g = !0;
				if("init" == c && (c = null, f = !0, g = e.initIsTriggerEvent ? !0 : !1), c = e.isTextBoxMode ? b : c || d.findTextByValue(b), e.tree) setTimeout(function() {
					e.setTextBySource ? d.selectValueByTree(b) : d.treeSelectInit(b)
				}, 100);
				else if(e.isMultiSelect) {
					if(d._changeValue(b, c, g), null != b)
						for(h = b.toString().split(e.split), a("table.l-table-checkbox :checkbox", d.selectBox).each(function() {
								this.checked = !1
							}), i = 0; i < h.length; i++) a("table.l-table-checkbox tr[value=" + h[i] + "] :checkbox", d.selectBox).each(function() {
							this.checked = !0
						})
				} else d._changeValue(b, c, g), a("tr[value='" + b + "'] td", d.selectBox).addClass("l-selected"), a("tr[value!='" + b + "'] td", d.selectBox).removeClass("l-selected");
				e.selectBoxRenderUpdate && e.selectBoxRenderUpdate.call(d, {
					selectBox: d.selectBox,
					value: b,
					text: c
				})
			},
			selectValue: function(a) {
				this._setValue(a)
			},
			bulidContent: function() {
				var a = this,
					b = this.options;
				this.clearContent(), a.select ? a.setSelect() : b.tree && a.setTree(b.tree)
			},
			reload: function() {
				var a = this,
					b = this.options;
				b.url ? a.set("url", b.url) : a.grid && a.grid.reload()
			},
			_setUrl: function(b, c) {
				var d, e, f, g, h;
				if(b && (d = this, e = this.options, !e.readonly)) {
					if(e.delayLoad && !d.isAccessDelay && !d.triggerLoaded) return d.isAccessDelay = !0, void 0;
					if(b = a.isFunction(b) ? b.call(d) : b, f = a.isFunction(e.urlParms) ? e.urlParms.call(d) : e.urlParms)
						for(name in f) b += -1 == b.indexOf("?") ? "?" : "&", b += name + "=" + f[name];
					g = a.isFunction(e.parms) ? e.parms.call(d) : e.parms, "application/json" == e.ajaxContentType && "string" != typeof g && (g = liger.toJSON(g)), h = {
						type: e.ajaxType,
						url: b,
						data: g,
						cache: !1,
						dataType: "json",
						beforeSend: e.ajaxBeforeSend,
						complete: e.ajaxComplete,
						success: function(b) {
							var f = a.isFunction(e.dataGetter) ? f = e.dataGetter.call(d, b) : b;
							f = e.dataParmName && f ? f[e.dataParmName] : f, 0 != d.trigger("beforeSetData", [f]) && (d.setData(f), d.trigger("success", [f]), a.isFunction(c) && c(f))
						},
						error: function(a, b) {
							d.trigger("error", [a, b])
						}
					}, e.ajaxContentType && (h.contentType = e.ajaxContentType), a.ajax(h)
				}
			},
			setUrl: function(a, b) {
				return this._setUrl(a, b)
			},
			setParm: function(a, b) {
				var c, d;
				a && (c = this, d = c.get("parms"), d || (d = {}), d[a] = b, c.set("parms", d))
			},
			clearContent: function() {
				var b = this,
					c = this.options;
				b && (a("table", b.selectBox).html(""), b && b._setSelectBoxHeight(c.selectBoxHeight))
			},
			setSelect: function() {
				var b = this,
					c = this.options;
				this.clearContent(), b.data = [], a("option", b.select).each(function(c) {
					var f, d = a(this).val(),
						e = a(this).html();
					b.data.push({
						text: e,
						id: d
					}), f = a("<tr><td index='" + c + "' value='" + d + "' text='" + e + "'>" + e + "</td>"), a("table.l-table-nocheckbox", b.selectBox).append(f), a("td", f).hover(function() {
						a(this).addClass("l-over").siblings("td").removeClass("l-over")
					}, function() {
						a(this).removeClass("l-over")
					})
				}), a("td:eq(" + b.select[0].selectedIndex + ")", b.selectBox).each(function() {
					var d, e, f;
					return a(this).hasClass("l-selected") ? (b.selectBox.hide(), void 0) : (a(".l-selected", b.selectBox).removeClass("l-selected"), a(this).addClass("l-selected"), b.select[0].selectedIndex != a(this).attr("index") && b.select[0].onchange && (b.select[0].selectedIndex = a(this).attr("index"), b.select[0].onchange()), d = parseInt(a(this).attr("index")), b.select[0].selectedIndex = d, b.select.trigger("change"), b.selectBox.hide(), e = a(this).attr("value"), f = a(this).html(), c.render ? b.inputText.val(c.render(e, f)) : b.inputText.val(f), void 0)
				}), b._addClickEven()
			},
			_setData: function(a) {
				this.setData(a)
			},
			getRowIndex: function(a) {
				var d, e, b = this,
					c = this.options;
				if(!a) return -1;
				if(!b.data || !b.data.length) return -1;
				for(d = 0; d < b.data.length; d++)
					if(null != b.data[d] && (e = b.data[d][c.valueField], e == a)) return d;
				return -1
			},
			getRow: function(a) {
				var d, e, b = this,
					c = this.options;
				if(!a) return null;
				if(!b.data || !b.data.length) return null;
				for(d = 0; d < b.data.length; d++)
					if(null != b.data[d] && (e = b.data[d][c.valueField], e == a)) return b.data[d];
				return null
			},
			setData: function(b) {
				var e, f, g, h, i, j, k, l, m, n, c = this,
					d = this.options;
				if(!c.select) {
					if(d.selectBoxRender) return d.selectBoxRender.call(c, {
						selectBox: c.selectBox,
						data: b
					}), void 0;
					if(b && b.length || (b = []), c.data != b && (c.data = b), c.data = a.isFunction(c.data) ? c.data() : c.data, this.clearContent(), d.columns)
						for(c.selectBox.table.headrow = a("<tr class='l-table-headerow'><td width='18px'></td></tr>"), c.selectBox.table.append(c.selectBox.table.headrow), c.selectBox.table.addClass("l-box-select-grid"), e = 0; e < d.columns.length; e++) f = a("<td columnindex='" + e + "' columnname='" + d.columns[e].name + "'>" + d.columns[e].header + "</td>"), d.columns[e].width && f.width(d.columns[e].width), c.selectBox.table.headrow.append(f);
					for(g = [], d.emptyText && (c.emptyRow = {}, c.emptyRow[d.textField] = d.emptyText, c.emptyRow[d.valueField] = void 0 != d.emptyValue ? d.emptyValue : "", b.splice(0, 0, c.emptyRow)), h = 0; h < b.length; h++)
						if(i = b[h][d.valueField], j = b[h][d.textField], k = a.isFunction(d.isRowReadOnly) ? d.isRowReadOnly(b[h]) : !1, d.columns) {
							for(g.push("<tr value='" + i + "'"), k && g.push(" class='rowreadonly'"), g.push(">"), g.push("<td style='width:18px;'  index='" + h + "' value='" + i + "' text='" + j + "' ><input type='checkbox' /></td>"), e = 0; e < d.columns.length; e++) n = d.columns[e].name, g.push("<td>" + b[h][n] + "</td>");
							g.push("</tr>")
						} else g.push("<tr value='" + i + "'"), l = [], k && l.push(" rowreadonly "), a.isFunction(d.rowClsRender) && l.push(d.rowClsRender(b[h])), l.length && (g.push(" class='"), g.push(l.join("")), g.push("'")), g.push(">"), d.isShowCheckBox && g.push("<td style='width:18px;'  index='" + h + "' value='" + i + "' text='" + j + "' ><input type='checkbox' /></td>"), m = j, m = d.renderItem ? d.renderItem.call(c, {
							data: b[h],
							value: i,
							text: j,
							key: c.inputText.val()
						}) : d.autocomplete && d.highLight ? c._highLight(j, c.inputText.val()) : "<span>" + m + "</span>", g.push("<td index='" + h + "' value='" + i + "' text='" + j + "' align='left'>" + m + "</td></tr>");
					d.columns ? c.selectBox.table.append(g.join("")) : d.isShowCheckBox ? a("table.l-table-checkbox", c.selectBox).append(g.join("")) : a("table.l-table-nocheckbox", c.selectBox).append(g.join("")), d.addRowButton && d.addRowButtonClick && !c.addRowButton && (c.addRowButton = a('<div class="l-box-select-add"><a href="javascript:void(0)" class="link"><div class="icon"></div></a></div>'), c.addRowButton.find(".link").append(d.addRowButton).click(d.addRowButtonClick), c.selectBoxInner.after(c.addRowButton)), c.set("selectBoxHeight", d.selectBoxHeight), d.isShowCheckBox && a.fn.ligerCheckBox && a("table input:checkbox", c.selectBox).ligerCheckBox(), a(".l-table-checkbox input:checkbox", c.selectBox).change(function() {
						if(this.checked && c.hasBind("beforeSelect")) {
							var b = null;
							if(b = "div" == a(this).parent().get(0).tagName.toLowerCase() ? a(this).parent().parent() : a(this).parent(), null != b && 0 == c.trigger("beforeSelect", [b.attr("value"), b.attr("text")])) return c.selectBox.slideToggle("fast"), !1
						}
						d.isMultiSelect || this.checked && (a("input:checked", c.selectBox).not(this).each(function() {
							this.checked = !1, a(".l-checkbox-checked", a(this).parent()).removeClass("l-checkbox-checked")
						}), c.selectBox.slideToggle("fast")), c._checkboxUpdateValue()
					}), a("table.l-table-nocheckbox td", c.selectBox).hover(function() {
						a(this).parent().hasClass("rowreadonly") || a(this).addClass("l-over")
					}, function() {
						a(this).removeClass("l-over")
					}), c._addClickEven(), d.autocomplete || c.updateStyle(), c.trigger("afterShowData", [b])
				}
			},
			setTree: function(b) {
				var c = this,
					d = this.options;
				this.clearContent(), c.selectBox.table.remove(), 0 != b.checkbox ? b.onCheck = function() {
					var b = c.treeManager.getChecked(),
						e = [],
						f = [];
					a(b).each(function(a, b) {
						d.treeLeafOnly && b.data.children || (e.push(b.data[d.valueField]), f.push(b.data[d.textField]))
					}), c._changeValue(e.join(d.split), f.join(d.split), !0)
				} : (b.onSelect = function(a) {
					var b, e;
					0 != c.trigger("BeforeSelect", [a]) && (d.treeLeafOnly && a.data.children || (b = a.data[d.valueField], e = a.data[d.textField], c._changeValue(b, e, !0), c.selectBox.hide()))
				}, b.onCancelSelect = function() {
					c._changeValue("", "", !0)
				}), b.onAfterAppend = function() {
					if(c.treeManager) {
						var e = null;
						d.initValue ? e = d.initValue : "" != c.valueField.val() && (e = c.valueField.val()), c.selectValueByTree(e)
					}
				}, c.tree = a("<ul></ul>"), a("div:first", c.selectBox).append(c.tree), c.innerTree = c.tree.ligerTree(b), c.treeManager = c.tree.ligerGetTreeManager()
			},
			getTree: function() {
				return this.innerTree
			},
			selectValueByTree: function(a) {
				var d, b = this,
					c = this.options;
				null != a && (d = b.treeSelectInit(a), b._changeValue(a, d, c.initIsTriggerEvent))
			},
			treeSelectInit: function(b) {
				var e, f, c = this,
					d = this.options;
				return null != b ? (e = "", f = b.toString().split(d.split), a(f).each(function(a, b) {
					c.treeManager.selectNode(b.toString(), !1), e += c.treeManager.getTextByID(b), a < f.length - 1 && (e += d.split)
				}), e) : void 0
			},
			setGrid: function(b) {
				var e, f, g, h, i, j, k, l, m, n, o, c = this,
					d = this.options;
				c.grid || (d.hideOnLoseFocus = d.hideGridOnLoseFocus ? !0 : !1, this.clearContent(), c.selectBox.addClass("l-box-select-lookup"), c.selectBox.table.remove(), e = a("div:first", c.selectBox), f = a("<div></div>").appendTo(e), g = a("<div></div>").appendTo(e), c.conditionPanel = f, d.condition ? (h = a.extend({
					labelWidth: 60,
					space: 20,
					width: d.selectBoxWidth
				}, d.condition), c.condition = f.ligerForm(h)) : f.remove(), b = a.extend({
					columnWidth: 120,
					alternatingRow: !1,
					frozen: !0,
					rownumbers: !0,
					allowUnSelectRow: !0
				}, b, {
					width: "100%",
					height: c.getGridHeight(),
					inWindow: !1,
					parms: d.parms,
					isChecked: function(b) {
						var e = c.getValue();
						return e ? d.valueField && b[d.valueField] ? -1 != a.inArray(b[d.valueField].toString(), e.split(d.split)) : !1 : !1
					}
				}), c.grid = c.gridManager = g.ligerGrid(b), c.grid.bind("afterShowData", function() {
					c.updateSelectBoxPosition()
				}), i = [], j = function() {
					var e = [],
						f = [];
					a(i).each(function(a, b) {
						e.push(b[d.valueField]), f.push(b[d.textField])
					}), c.selected = b.checkbox ? i : i.length ? i[0] : null, c._changeValue(e.join(d.split), f.join(d.split), !0), c.trigger("gridSelect", {
						value: e.join(d.split),
						text: f.join(d.split),
						data: i
					})
				}, k = function(a) {
					for(var b = i.length - 1; b >= 0; b--) i[b][d.valueField] == a[d.valueField] && i.splice(b, 1)
				}, l = function(a) {
					for(var b = i.length - 1; b >= 0; b--)
						if(i[b][d.valueField] == a[d.valueField]) return;
					i.push(a)
				}, b.checkbox ? (m = function(a, b) {
					a && l(b), !a && k(b)
				}, c.grid.bind("CheckAllRow", function(b) {
					a(c.grid.rows).each(function(a, c) {
						m(b, c)
					}), j()
				}), c.grid.bind("CheckRow", function(a, b) {
					m(a, b), j()
				})) : (c.grid.bind("SelectRow", function(a) {
					i = [a], j(), c._toggleSelectBox(!0)
				}), c.grid.bind("UnSelectRow", function() {
					i = [], j()
				})), c.bind("show", function() {
					c.grid.refreshSize()
				}), c.bind("clear", function() {
					i = [], c.grid.selecteds = [], c.grid._showData()
				}), d.condition && (n = a('<li style="margin-right:9px"><div></div></li>'), o = a('<li style="margin-right:9px;float:right"><div></div></li>'), a("ul:first", f).append(n).append(o).after('<div class="l-clear"></div>'), a("div", n).ligerButton({
					text: d.Search,
					width: 40,
					click: function() {
						var e = c.condition.toConditions();
						d.conditionSearchClick ? d.conditionSearchClick({
							grid: c.grid,
							rules: e
						}) : c.grid.get("url") ? (c.grid.setParm(b.conditionParmName || "condition", a.ligerui.toJSON(e)), c.grid.reload()) : c.grid.loadData(a.ligerFilter.getFilterFunction(e))
					}
				}), a("div", o).ligerButton({
					text: "关闭",
					width: 40,
					click: function() {
						c.selectBox.hide()
					}
				})), c.grid.refreshSize())
			},
			getGridHeight: function(a) {
				var b = this;
				return this.options, a = a || b.selectBox.height(), a -= b.conditionPanel.height()
			},
			_getValue: function() {
				var b = this,
					c = this.options;
				return c.isTextBoxMode ? b.inputText.val() : a(this.valueField).val()
			},
			getValue: function() {
				return this._getValue()
			},
			getSelected: function() {
				return this.selected
			},
			upFocus: function() {
				var d, e, f, b = this;
				if(this.options, b.grid) {
					if(!b.grid.rows || !b.grid.rows.length) return;
					d = b.grid.getSelected(), d ? (e = a.inArray(d, b.grid.rows), e - 1 < b.grid.rows.length && (b.grid.unselect(d), b.grid.select(b.grid.rows[e - 1]))) : b.grid.select(b.grid.rows[0])
				} else {
					if(f = b.selectBox.table.find("td.l-over").attr("index"), void 0 == f || "0" == f) return;
					f = parseInt(f) - 1, b.selectBox.table.find("td.l-over").removeClass("l-over"), b.selectBox.table.find("td[index=" + f + "]").addClass("l-over"), b._scrollAdjust(f)
				}
			},
			downFocus: function() {
				var d, e, f, b = this;
				if(this.options, b.grid) {
					if(!b.grid.rows || !b.grid.rows.length) return;
					d = b.grid.getSelected(), d ? (e = a.inArray(d, b.grid.rows), e + 1 < b.grid.rows.length && (b.grid.unselect(d), b.grid.select(b.grid.rows[e + 1]))) : b.grid.select(b.grid.rows[0])
				} else {
					if(f = b.selectBox.table.find("td.l-over").attr("index"), f == b.data.length - 1) return;
					f = void 0 == f ? 0 : parseInt(f) + 1, b.selectBox.table.find("td.l-over").removeClass("l-over"), b.selectBox.table.find("td[index=" + f + "]").addClass("l-over"), b._scrollAdjust(f)
				}
			},
			_scrollAdjust: function(b) {
				var e, f, h, i, c = this;
				this.options, e = a(".l-box-select-inner", c.selectBox).height(), f = a(".l-box-select-inner table", c.selectBox).height(), e >= f || (parseInt(f / e) + (f % e ? 1 : 0), h = f / c.data.length, i = parseInt((b + 1) * h / e) + ((b + 1) * h % e ? 1 : 0), a(".l-box-select-inner", c.selectBox).scrollTop((i - 1) * e))
			},
			getText: function() {
				return this.inputText.val()
			},
			setText: function(a) {
				var b = this,
					c = this.options;
				c.isTextBoxMode || b.inputText.val(a)
			},
			updateStyle: function() {
				var a = this,
					b = this.options;
				b.initValue = a._getValue(), a._dataInit()
			},
			_dataInit: function() {
				var e, b = this,
					c = this.options,
					d = null;
				null != c.initValue && null != c.initText && b._changeValue(c.initValue, c.initText), null != c.initValue ? (d = c.initValue, c.tree ? d && b.selectValueByTree(d) : b.data && (e = b.findTextByValue(d), b._changeValue(d, e))) : "" != b.valueField.val() && (d = b.valueField.val(), c.tree ? d && b.selectValueByTree(d) : b.data && (e = b.findTextByValue(d), b._changeValue(d, e))), c.isShowCheckBox ? a(":checkbox", b.selectBox).each(function() {
					var f, b = null,
						e = a(this);
					b = "div" == e.parent().get(0).tagName.toLowerCase() ? e.parent().parent() : e.parent(), null != b && (a(".l-checkbox", b).removeClass("l-checkbox-checked"), e[0].checked = !1, f = (d || "").toString().split(c.split), a(f).each(function(c, f) {
						null != d && f == b.attr("value") && (a(".l-checkbox", b).addClass("l-checkbox-checked"), e[0].checked = !0)
					}))
				}) : a("table tr", b.selectBox).find("td:first").each(function() {
					null != d && d == a(this).attr("value") ? a(this).addClass("l-selected") : a(this).removeClass("l-selected")
				})
			},
			_changeValue: function(b, c, d) {
				var g, h, e = this,
					f = this.options;
				e.valueField.val(b), f && f.render ? e.inputText.val(f.render(b, c)) : e.inputText.val(c), e.select && a("option", e.select).each(function() {
					a(this).attr("selected", a(this).attr("value") == b)
				}), e.selectedValue = b, e.selectedText = c, e.inputText.trigger("change"), d && c && e.inputText.focus(), g = null, b && "string" == typeof b && b.indexOf(f.split) > -1 ? (g = [], h = b.split(f.split), a(h).each(function(a, b) {
					g.push(e.getRow(b))
				})) : b && (g = e.getRow(b)), d && e.trigger("selected", [b, c, g])
			},
			_checkboxUpdateValue: function() {
				var b = this,
					c = this.options,
					d = "",
					e = "";
				a("input:checked", b.selectBox).each(function() {
					var b = null;
					b = "div" == a(this).parent().get(0).tagName.toLowerCase() ? a(this).parent().parent() : a(this).parent(), b && (d += b.attr("value") + c.split, e += b.attr("text") + c.split)
				}), d.length > 0 && (d = d.substr(0, d.length - 1)), e.length > 0 && (e = e.substr(0, e.length - 1)), b._changeValue(d, e)
			},
			loadDetail: function(b, c) {
				var g, d = this,
					e = this.options,
					f = a.isFunction(e.detailParms) ? e.detailParms.call(d) : e.detailParms;
				f[e.detailPostIdField || "id"] = b, "application/json" == e.ajaxContentType && (f = liger.toJSON(f)), g = {
					type: e.ajaxType,
					url: e.detailUrl,
					data: f,
					cache: !0,
					dataType: "json",
					beforeSend: e.ajaxBeforeSend,
					complete: e.ajaxComplete,
					success: function(b) {
						var d = a.isFunction(e.detailDataGetter) ? e.detailDataGetter(b) : b;
						d = e.detailDataParmName ? d[e.detailDataParmName] : d, c && c(d)
					}
				}, e.ajaxContentType && (g.contentType = e.ajaxContentType), a.ajax(g)
			},
			enabledLoadDetail: function() {
				var b = this.options;
				return b.detailUrl && b.detailEnabled ? !0 : !1
			},
			_addClickEven: function() {
				var b = this,
					c = this.options;
				a(".l-table-nocheckbox td", b.selectBox).click(function() {
					function j() {
						return b.hasBind("beforeSelect") && 0 == b.trigger("beforeSelect", [e, h, g]) ? (c.slide ? b.selectBox.slideToggle("fast") : b.selectBox.hide(), !1) : (b.selected = g, a(this).hasClass("l-selected") ? (c.slide ? b.selectBox.slideToggle("fast") : b.selectBox.hide(), void 0) : (a(".l-selected", b.selectBox).removeClass("l-selected"), d.addClass("l-selected"), b.select && b.select[0].selectedIndex != f && (b.select[0].selectedIndex = f, b.select.trigger("change")), c.slide ? (b.boxToggling = !0, b.selectBox.hide("fast", function() {
							b.boxToggling = !1
						})) : b.selectBox.hide(), b.lastInputText = h, b._changeValue(e, h, !0), void 0))
					}
					var d = a(this),
						e = d.attr("value"),
						f = parseInt(a(this).attr("index")),
						g = b.data[f],
						h = d.attr("text"),
						i = d.parent().hasClass("rowreadonly");
					i || (b.enabledLoadDetail() ? b.loadDetail(e, function(a) {
						b.data[f] = g = a, j()
					}) : j())
				})
			},
			updateSelectBoxPosition: function() {
				var d, e, f, b = this,
					c = this.options;
				c && c.absolute ? (d = a(document).height(), c.alwayShowInTop || Number(b.wrapper.offset().top + 1 + b.wrapper.outerHeight() + b.selectBox.height()) > d && d > Number(b.selectBox.height() + 1) ? b.selectBox.css({
					left: b.wrapper.offset().left,
					top: b.wrapper.offset().top - 1 - b.selectBox.height() + (c.selectBoxPosYDiff || 0)
				}) : b.selectBox.css({
					left: b.wrapper.offset().left,
					top: b.wrapper.offset().top + 1 + b.wrapper.outerHeight() + (c.selectBoxPosYDiff || 0)
				}), c.alwayShowInDown && b.selectBox.css({
					left: b.wrapper.offset().left,
					top: b.wrapper.offset().top + 1 + b.wrapper.outerHeight()
				})) : (e = b.wrapper.offset().top - a(window).scrollTop(), f = b.selectBox.height() + textHeight + 4, e + f > a(window).height() && e > f && b.selectBox.css("marginTop", -1 * (b.selectBox.height() + textHeight + 5) + (c.selectBoxPosYDiff || 0)))
			},
			_toggleSelectBox: function(b) {
				var e, f, g, h, j, c = this,
					d = this.options;
				if(c && d) {
					for(e = a.ligerui.find(a.ligerui.controls.ComboBox), f = 0, g = e.length; g > f; f++) h = e[f], h.id != c.id && null != h.selectBox.is(":visible") && h.selectBox.is(":visible") && h.selectBox.hide();
					for(e = a.ligerui.find(a.ligerui.controls.DateEditor), f = 0, g = e.length; g > f; f++) h = e[f], h.id != c.id && null != h.dateeditor.is(":visible") && h.dateeditor.is(":visible") && h.dateeditor.hide();
					c.wrapper.height(), c.boxToggling = !0, b ? d.slide ? c.selectBox.slideToggle("fast", function() {
						c.boxToggling = !1
					}) : (c.selectBox.hide(), c.boxToggling = !1) : (c.updateSelectBoxPosition(), d.slide ? c.selectBox.slideToggle("fast", function() {
						if(c.boxToggling = !1, !d.isShowCheckBox && a("td.l-selected", c.selectBox).length > 0) {
							var b = a("td.l-selected", c.selectBox).offset().top - c.selectBox.offset().top;
							a(".l-box-select-inner", c.selectBox).animate({
								scrollTop: b
							})
						}
					}) : (c._selectBoxShow(), c.boxToggling = !1, !c.tree && !c.grid && !d.isShowCheckBox && a("td.l-selected", c.selectBox).length > 0 && (j = a("td.l-selected", c.selectBox).offset().top - c.selectBox.offset().top, a(".l-box-select-inner", c.selectBox).animate({
						scrollTop: j
					})))), c.isShowed = c.selectBox.is(":visible"), c.trigger("toggle", [b]), c.trigger(b ? "hide" : "show")
				}
			},
			_selectBoxShow: function() {
				var a = this,
					b = this.options;
				if(!b.readonly) return b.grid || b.tree ? (a.selectBox.show(), void 0) : (a.selectBox.table.find("tr").length || b.selectBoxRender && a.selectBoxInner.html() ? a.selectBox.show() : a.selectBox.hide(), void 0)
			},
			_highLight: function(a, b) {
				if(!a) return a;
				var c = a.indexOf(b);
				return -1 == c ? a : a.substring(0, c) + "<span class='l-highLight'>" + b + "</span>" + a.substring(b.length + c)
			},
			_setAutocomplete: function(b) {
				var c = this,
					d = this.options;
				b && (d.readonly || (c.inputText.removeAttr("readonly"), c.lastInputText = c.inputText.val(), c.inputText.keyup(function(e) {
					38 != e.keyCode && 40 != e.keyCode && 13 != e.keyCode && (this._acto && clearTimeout(this._acto), this._acto = setTimeout(function() {
						if(c.lastInputText != c.inputText.val()) {
							var e = c.inputText.val();
							if(e ? e = e.replace(/(^\s*)|(\s*$)/g, "") : (d.initValue = "", c.valueField.val("")), c.lastInputText = c.inputText.val(), a.isFunction(b)) return b.call(c, {
								key: e,
								show: function() {
									c._selectBoxShow()
								}
							}), void 0;
							if(!d.autocompleteAllowEmpty && !e) return c.clear(), c.selectBox.hide(), void 0;
							d.url ? (c.setParm("key", e), c.setUrl(d.url, function() {
								c._selectBoxShow()
							})) : d.grid && (c.grid.setParm("key", e), c.grid.reload()), this._acto = null
						}
					}, 300))
				})))
			}
		}), a.ligerui.controls.ComboBox.prototype.setValue = a.ligerui.controls.ComboBox.prototype.selectValue, a.ligerui.controls.ComboBox.prototype.setInputValue = a.ligerui.controls.ComboBox.prototype._changeValue,
		function() {
			a(document).unbind("keydown.ligercombobox"), a(document).bind("keydown.ligercombobox", function(b) {
				function c() {
					f.selectBox.is(":visible") || f.selectBox.show(), f.downFocus()
				}

				function d() {
					h ? (f._changeValue(h[g.valueField], h[g.textField], !0), f.selectBox.hide(), f.trigger("textBoxKeyEnter", [{
						rowdata: h
					}])) : (f._changeValue(j, i.attr("text"), !0), f.selectBox.hide(), f.trigger("textBoxKeyEnter", [{
						element: i.get(0)
					}]))
				}
				var f, g, h, i, j, e = a("input:focus");
				if(e.length && e.attr("data-comboboxid")) {
					if(f = liger.get(e.attr("data-comboboxid")), !f) return;
					if(g = f.options, !f.get("keySupport")) return;
					if(38 == b.keyCode) f.upFocus();
					else if(40 == b.keyCode) f.hasBind("textBoxKeyDown") ? f.trigger("textBoxKeyDown", [{
						callback: function() {
							c()
						}
					}]) : c();
					else if(13 == b.keyCode) {
						if(!f.selectBox.is(":visible")) return;
						h = null, f.grid && (h = f.grid.getSelected()), i = f.selectBox.table.find("td.l-over"), (h || i.length) && (j = i.attr("value"), h && h.ID && (j = h.ID), f.enabledLoadDetail() ? f.loadDetail(j, function(a) {
							if(!h) {
								var b = f.getRowIndex(j);
								if(-1 == b) return;
								f.data = f.data || [], f.data[b] = f.selected = a
							}
							d()
						}) : d())
					}
				}
			})
		}()
}(jQuery);