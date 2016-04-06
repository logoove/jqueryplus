
/*
 * @desc	List operator
 */
var Util_List = {
	mf_add : function(lo_ListObj, ld_Text, ld_Value) {
		var lo_Option = document.createElement("option");
		lo_Option.appendChild(document.createTextNode(ld_Text));
		lo_Option.setAttribute("value", ld_Value);
		lo_ListObj.appendChild(lo_Option);
	},
	mf_clear : function(lo_ListObj) {
		for (var ld_i = lo_ListObj.options.length - 1; ld_i >= 0; ld_i--) {
			try {
				lo_ListObj.remove(ld_i);
			} catch (e) {
			}
		}
		this.mf_add(lo_ListObj, '---', '');
	},
	mf_select : function(lo_ListObj, ld_Value) {
		var ld_i = 0;
		for (; ld_i < lo_ListObj.options.length; ld_i++) {
			if (lo_ListObj.options[ld_i].value == ld_Value) {
				break;
			};
		}
		if (ld_i >= lo_ListObj.options.length) {
			return false;
		}
		try { // An error message will be show under IE6, but it still work, so we wrap it with try...catch
			lo_ListObj.options[ld_i].selected = true;
		} catch (e) {
		}
		lo_ListObj.selectedIndex = ld_i;
		lo_ListObj.value = ld_Value;
		return true;
	},
	mf_isempty : function(lo_ListObj) {
		if ((lo_ListObj.options.length > 0) && (lo_ListObj.value == "")) {
			return true;
		} else {
			return false;
		}
	}
};

/*
 * @desc	AJAX Object
 */
var XmlHttp = {
	mf_createxmlhttp : function() {
		var lo_http_request = false;
		if (window.ActiveXObject) {
			// var
			// ld_xmlhttps=["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
			var ld_xmlhttps = ["MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0",
					"MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
			for (var l_i = 0; l_i < ld_xmlhttps.length; l_i++) {
				try {
					lo_http_request = new ActiveXObject(ld_xmlhttps[l_i]);
					break;
				} catch (ld_e) {
					lo_http_request = false;
				}
			}
		} else {
			try {
				lo_http_request = new XMLHttpRequest();
			} catch (ld_e) {
				lo_http_request = false;
			}
		}
		return lo_http_request;
	},
	mf_sendrequest : function(lo_xmlhttp, ld_url, lf_process) {
		lo_xmlhttp.onreadystatechange = lf_process;
		lo_xmlhttp.open("GET", ld_url, true);
		lo_xmlhttp.send(null);
	},
	mf_sendrequest_sync : function(lo_xmlhttp, ld_url) {
		lo_xmlhttp.open("GET", ld_url, false);
		lo_xmlhttp.send(null);
	},
	mf_postrequest : function(lo_xmlhttp, ld_url, lf_process, ld_data) {
		lo_xmlhttp.onreadystatechange = lf_process;
		lo_xmlhttp.open("POST", ld_url, true);
		lo_xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		lo_xmlhttp.send(ld_data);
	}
};

/*
 * @desc	List object for location
 */
var LocalList = {
	mo_options : null,
	mo_countryObj : null,
	mo_stateObj : null,
	mo_cityObj : null,
	md_defaultCountry : "",
	md_defaultState : "",
	md_defaultCity : "",
	md_loadingId : "loading",
	md_load_completeId : "load_complete",
	md_http_request : false,
	md_loc_xml : false,
	md_bgetfailed : false,
	md_bInit : false,
	md_bAreaLoaded : false,
	md_bUpdate : false,
	
	
	mf_init : function(options) {
		this.mo_options = {
			country: 'country',
			state: 'state',
			city: 'city',
			current: '',
			language: 'zh_cn',
			path_to_xml: '',
			read_only: false
		};
		for (var i in this.mo_options) {
			if (options[i]) this.mo_options[i] = options[i];
		}
		this.mo_options.read_only = this.mo_options.read_only || false;
		
		if (this.mo_options.read_only) {
			document.write('<label id="' + this.mo_options.city + '"></label>');
		} else {
			document.write('<select id="' + this.mo_options.country + '" name="' + this.mo_options.country + '" onChange="LocalList.mf_processStateList()"></select>&nbsp;');
			document.write('<select id="' + this.mo_options.state + '" name="' + this.mo_options.state + '" onChange="LocalList.mf_processCityList()"></select>&nbsp;');
			document.write('<select id="' + this.mo_options.city + '" name="' + this.mo_options.city + '"></select>&nbsp;');
			this.mo_countryObj = document.getElementById(this.mo_options.country);
			this.mo_stateObj = document.getElementById(this.mo_options.state);
		}
		
		this.mo_cityObj = document.getElementById(this.mo_options.city);

		if (LocalList.mo_options.read_only && (!this.mo_options.current || this.mo_options.current == '||')) {
			this.mo_cityObj.innerHTML = '-';
			return ;
		}
		
		this.mf_getinfo(this.mo_options.language, this.mo_options.path_to_xml);
		var l_area = this.mo_options.current.split("|");
		this.md_defaultCountry = (l_area[0] ? l_area[0] : "");
		this.md_defaultState = (l_area[1] ? l_area[1] : "");
		this.md_defaultCity = (l_area[2] ? l_area[2] : "");
		this.md_bInit = true;
	},
	
	mf_getinfo : function(lang, path) {
		if (!lang) lang = "zh_cn";
		if (!path) path = "";
		
		var ld_url = path + "LocalList-" + lang + ".xml";
		if (navigator.userAgent.indexOf("Opera") > -1) {
			ld_url += ("?seed=" + Math.random());
		}
		this.md_http_request = XmlHttp.mf_createxmlhttp();
		if (!this.md_http_request) {
			return false;
		}
		this.md_bgetfailed = false;
		XmlHttp.mf_sendrequest_sync(this.md_http_request, ld_url);
		this.mf_RecvLocList();
		return true;
	},
	
	mf_RecvLocList : function() {
		if (LocalList.md_http_request.readyState == 4) {
			if (LocalList.md_http_request.status == 200) {
				LocalList.md_loc_xml = LocalList.md_http_request.responseXML.documentElement;
				if (LocalList.mo_options.read_only) {
					LocalList.mf_showCity();
				} else {
					LocalList.mf_initUpdate();
				}
			} else {
				LocalList.md_bgetfailed = true;
				alert("Get area list failed, please refresh and try it again!");
			}
		}
	},
	
	mf_initUpdate : function() {
		if (!this.md_bInit || !this.md_loc_xml) {
			setTimeout("LocalList.mf_initUpdate();", 300);
			return;
		}
		this.mf_processCountryList();
		if (this.md_defaultCountry != "") {
			if (Util_List.mf_select(this.mo_countryObj, this.md_defaultCountry)) {
				this.mf_processStateList();
			}
		}
		if (this.md_defaultState != "") {
			if (Util_List.mf_select(this.mo_stateObj, this.md_defaultState)) {
				this.mf_processCityList();
			}
		}
		if (this.md_defaultCity != "") {
			if (Util_List.mf_select(this.mo_cityObj, this.md_defaultCity)) {
				;
			}
		}

		this.md_bAreaLoaded = true;
		return true;
	},
	
	mf_showCity : function() {
		if (!this.md_bInit || !this.md_loc_xml) {
			setTimeout("LocalList.mf_showCity();", 300);
			return;
		}
		
		var city = '';
		var lo_Countrys = this.md_loc_xml.getElementsByTagName("CountryRegion");
		for (var l_i = 0; l_i < lo_Countrys.length; l_i++) {
			if (this.md_defaultCountry == lo_Countrys[l_i].getAttribute("Code")) {
				city += lo_Countrys[l_i].getAttribute("Name");
				break;
			}
		}
		
		var lo_States = lo_Countrys[l_i].getElementsByTagName("State");
		if (lo_States.length > 1) {
			for (l_i = 0; l_i < lo_States.length; l_i++) {
				if (this.md_defaultState == lo_States[l_i].getAttribute("Code")) {
					city += lo_States[l_i].getAttribute("Name");
					break;
				}
			}
			if (lo_States[l_i]) {
				var lo_Citys = lo_States[l_i].getElementsByTagName("City");
				if (lo_Citys.length > 0) {
					for (l_i = 0; l_i < lo_Citys.length; l_i++) {
						if (this.md_defaultCity == lo_Citys[l_i].getAttribute("Code")) {
							city += lo_Citys[l_i].getAttribute("Name");
							break;
						}
					}
				}
			}
		}
		this.mo_cityObj.innerHTML = city;
		return ;
	},
	
	mf_processCountryList : function() {
		if (!this.md_bInit || !this.md_loc_xml) {
			return;
		}
		var lo_CountryDivObj = this.mo_countryObj;
//		lo_CountryDivObj.style.display = "none";
		Util_List.mf_clear(this.mo_countryObj);
		var lo_Countrys = this.md_loc_xml.getElementsByTagName("CountryRegion");
		var ld_text = "", ld_value = "";
		for (var l_i = 0; l_i < lo_Countrys.length; l_i++) {
			ld_text = lo_Countrys[l_i].getAttribute("Name");
			ld_value = lo_Countrys[l_i].getAttribute("Code");
			Util_List.mf_add(this.mo_countryObj, ld_text, ld_value);
		}
		lo_CountryDivObj.style.display = "inline";
		this.mf_processStateList();
	},
	
	mf_processStateList : function() {
		if (!this.md_bInit || !this.md_loc_xml) {
			return;
		}
		var lo_StateDivObj = this.mo_stateObj;
//		lo_StateDivObj.style.display = "none";
		Util_List.mf_clear(this.mo_stateObj);
		do {
			var lo_Countrys = this.md_loc_xml
					.getElementsByTagName("CountryRegion");
			var ld_Country = this.mo_countryObj.value;
			var l_i = 0;
			for (l_i = 0; l_i < lo_Countrys.length; l_i++) {
				if (lo_Countrys[l_i].getAttribute("Code") == ld_Country) {
					break;
				}
			}
			if (l_i >= lo_Countrys.length) {
				break;
			}
			var lo_States = lo_Countrys[l_i].getElementsByTagName("State");
			
			if (lo_States.length <= 1) {
				lo_StateDivObj.style.display = "none";
				break;
			}
			var ld_text = "", ld_value = "";
			for (l_i = 0; l_i < lo_States.length; l_i++) {
				ld_text = lo_States[l_i].getAttribute("Name");
				ld_value = lo_States[l_i].getAttribute("Code");
				Util_List.mf_add(this.mo_stateObj, ld_text, ld_value);
			}
			lo_StateDivObj.style.display = "inline";
			if (this.md_bUpdate && (Util_List.mf_isempty(this.mo_stateObj))) {
				this.mo_stateObj.focus();
			}
		} while (false);
		if (lo_StateDivObj.style.display == "none") {
			// ErrMapUtil.mf_DelFromErrMap(g_TitleArr[6]);
		}
		this.mf_processCityList();
	},
	
	mf_processCityList : function() {
		if (!this.md_bInit || !this.md_loc_xml) {
			return;
		}
		var lo_CityDivObj = this.mo_cityObj;
//		lo_CityDivObj.style.display = "none";
		Util_List.mf_clear(this.mo_cityObj);
		do {
			var lo_Countrys = this.md_loc_xml
					.getElementsByTagName("CountryRegion");
			var ld_Country = this.mo_countryObj.value;
			var l_i = 0;
			for (l_i = 0; l_i < lo_Countrys.length; l_i++) {
				if (lo_Countrys[l_i].getAttribute("Code") == ld_Country) {
					break;
				}
			}
			if (l_i >= lo_Countrys.length) {
				break;
			}
			var lo_States = lo_Countrys[l_i].getElementsByTagName("State");
			l_i = 0;
			if (lo_States.length > 1) {
				var ld_State = this.mo_stateObj.value;
				for (; l_i < lo_States.length; l_i++) {
					if (lo_States[l_i].getAttribute("Code") == ld_State) {
						break;
					}
				}
				if (l_i >= lo_States.length) {
					break;
				}
			} else if (lo_States.length <= 0) {
				break;
			}
			var lo_Citys = lo_States[l_i].getElementsByTagName("City");
			if (lo_Citys.length <= 0) {
				break;
			}
			var ld_text = "", ld_value = "";
			for (l_i = 0; l_i < lo_Citys.length; l_i++) {
				ld_text = lo_Citys[l_i].getAttribute("Name");
				ld_value = lo_Citys[l_i].getAttribute("Code");
				Util_List.mf_add(this.mo_cityObj, ld_text, ld_value);
			}
			lo_CityDivObj.style.display = "inline";
			if (this.md_bUpdate && (Util_List.mf_isempty(this.mo_cityObj))) {
				this.mo_cityObj.focus();
			}
		} while (false)
		if (lo_CityDivObj.style.display == "none") {
			// ErrMapUtil.mf_DelFromErrMap(g_TitleArr[7]);
		}
	}
};