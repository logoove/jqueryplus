/* 
 * Zepto DatePicker Plugin
 * Version 1.0
 * Author iancj 2014-05-14
 * Visit http://github.com/iancj/jdate for more information
 *
*/
;(function($, document, window) {

    //今天
    var nowdate=new Date(),
        now={
            year:nowdate.getFullYear(),
            month:nowdate.getMonth()+1,
            date:nowdate.getDate()
        }

    //当前选择的日期
    var selectedDate={
        year:now.year,
        month:now.month,
        date:now.date
    }

    function Jdate() {
        this.swipe = null; //滑动对象
        this.tablePanels = null; //表格容器
    }

    //初始化
    Jdate.prototype.init = function($target,year,month) {

        var $jdate=$("#jdate") || null;

        //如果页面不存在jdate则创建
        if ($jdate.length < 1) {

            $jdate = $('<section id="jdate"></section>');

            var $jdateheader = $('<header id="jdate-header"></header>'),//头部
                $jdateheader_btn_check=$('<i class="icon icon-check ftsize20" id="jdate-btn-check"></i>'),
                $jdateheader_btn_remove=$('<i class="icon icon-remove" id="jdate-btn-remove"></i>'),
                $jdateheaderinfo=$('<section class="jdate-header-info"></section>'),//头部信息
                $jdateheader_btn_prev=$('<i class="icon-arrowleft" id="jdate-btn-prev"></i>'),
                $jdateheader_btn_next=$('<i class="icon-arrowright" id="jdate-btn-next"></i>'),
                $jdateheaderinfo_txt=$('<span></span>'),
                $jdateweek = $('<section class="jdate-week table"></section>'),//星期
                $slider = $('<div class="swipe" id="slider"></div>'),//滑动容器
                $jdatecontainer = $('<ul class="swipe-wrap" id="jdate-container"></ul>');//日期表格

            var self=this;

            $jdateheader_btn_prev.tap(function(){
                self.swipe.prev();
            });

            $jdateheader_btn_next.tap(function(){
                self.swipe.next();
            });

            $jdateheader_btn_remove.click(function(){
                _close($jdate);
            });

            $jdateheader_btn_check.click(function(){
                //写入表单元素中，并触发change事件
                $target.val(selectedDate.year+"-"+selectedDate.month+"-"+selectedDate.date).change();
                 _close($jdate);
            });

            //头部
            $jdateheaderinfo_txt.text(year+"年"+month+"月");

            $jdateheaderinfo.append(
                $jdateheader_btn_prev,
                $jdateheader_btn_next,
                $jdateheaderinfo_txt
            );

            $jdateheader.append(
                $jdateheader_btn_check,
                $jdateheader_btn_remove,
                $jdateheaderinfo
            );

            //星期
            $jdateweek.append(
                '<span class="col">日</span>',
                '<span class="col">一</span>',
                '<span class="col">二</span>',
                '<span class="col">三</span>',
                '<span class="col">四</span>',
                '<span class="col">五</span>',
                '<span class="col">六</span>'
            );

            //日期表格容器
            var tablePanels=[
                $('<li data-year="" data-month=""></li>'),
                $('<li data-year="" data-month=""></li>'),
                $('<li data-year="" data-month=""></li>')
            ];
            this.tablePanels = tablePanels;

            //将日期表格容器插入到container
            for(var i=0;i<tablePanels.length;i++){
                $jdatecontainer.append(tablePanels[i]);
            }

            $slider.append($jdatecontainer);
            $jdate.append($jdateheader, $jdateweek, $slider);
            $("body").append($jdate);

            //初始化滑动对象
            this.createSwipe();
        }

        this.updateTable(0, year, month);
        this.updateTable(1, year, month+1);
        this.updateTable(2, year, month-1);

        _show($jdate);
    }

    //创建滑动对象
    Jdate.prototype.createSwipe = function() {
        var self = this;
        this.swipe = new Swipe(document.getElementById('slider'), {
            startSlide: 0,
            speed: 400,
            auto: false,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            transitionEnd: function(index, elem) {

            },
            callback: function(index, elem) {
                // console.log(selectedDate)
                var $ele = $(elem),
                    year = $ele.data("year"), //当前选择的年份
                    month = $ele.data("month"); //当前选择的月份

                //更新头部的年月
                $("#jdate-header .jdate-header-info>span").text(year + "年" + month + "月");

                //更新当前焦点容器两边的月份容器
                switch (index) {
                    case 0:
                        self.updateTable(1, year, month + 1)
                        self.updateTable(2, year, month - 1)
                        break;
                    case 1:
                        self.updateTable(0, year, month - 1)
                        self.updateTable(2, year, month + 1)
                        break;
                    case 2:
                        self.updateTable(1, year, month - 1)
                        self.updateTable(0, year, month + 1)
                        break;
                }
            }
        });
    }

    //更新table容器
    Jdate.prototype.updateTable = function(index, year, month) {
        var $ele = this.tablePanels[index];
        //月份超过12，增年份+1,月份设为1
        if (month > 12) {
            var year = year + 1;
            var month = 1;
        }
        //月份小于1，增年份-1,月份设为12
        else if (month < 1) {
            var year = year - 1;
            var month = 12;
        }
        $ele.data("month", month);
        $ele.data("year", year);
        $ele.empty().append(_getCalendar(year, month));
    }

    //得到每月的天数  
    function _getDaysOfMonth(year, month) {
        if (year && month) {
            if (month == 2) {
                //2月闰年判断  
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    return 29;
                }
                return 28;
            }
            var bigMonth = [1, 3, 5, 7, 8, 10, 12];
            var littleMonth = [4, 6, 9, 11];
            for (var m in bigMonth) {
                if (bigMonth[m] == month)
                    return 31;
            }
            for (var m in littleMonth) {
                if (littleMonth[m] == month)
                    return 30;
            }
        }
    }

    //根据年月生成日历 
    function _getCalendar(year, month) {
        if (year && month) {

            var date = new Date(year, month - 1, 1), //每月的第一天  
                week = date.getDay(), //星期几
                days = _getDaysOfMonth(year, month), //month月的总天数 
                temp_rows = Math.floor((days + week) / 7),
                rows = (days + week) % 7 == 0 ? temp_rows : (temp_rows + 1); //要输出的行数

            var count = 1, //天数计算器
                $table = $('<ul class="jdate-table table"></ul>');

            for (var i = 1; i <= rows; i++) {
                var $row = $('<li class="row"></li>');

                for (var j = 1; j <= 7; j++) {
                    //如果是第一行，这个月第一天之前的cell输出空值
                    //这个月最后一天之后的单元格输出空值
                    if ((i == 1 && j <= week) || count > days) {
                        $row.append('<span class="col"></span>');
                    } else {
                        var dom_class="col jdate-col ",//dom的class
                            dom_text="",//dom显示的文字
                            dom_data='data-year="'+year+'" data-month="'+month+'" data-date="'+count+'"';
                            //判断是否是今天
                            if(now.date==count && now.month==month && now.year==year){
                                dom_class+="col-today ";
                                dom_text="今天";
                            }
                            else{
                                dom_text=count;
                            }
                            //如果当前输出日期与之前选择的一致，则加上选中样式
                            if(selectedDate.year==year && selectedDate.month==month && selectedDate.date==count){
                                dom_class+="selected ";
                            }
                            $row.append('<span class="'+dom_class+'" '+dom_data+'>'+dom_text+'</span>');
                            count++;                      
                    }

                }

                $table.append($row);
            }

            $table.find(".jdate-col").tap(function() {
                var $self=$(this);
                $("#jdate-container .jdate-col").removeClass("selected");
                $self.toggleClass("selected");

                selectedDate.year=$self.data("year");
                selectedDate.month=$self.data("month");
                selectedDate.date=$self.data("date");
            });

            return $table;
        }
    }

    //关闭
    function _close(ele){
        selectedDate={
            year:now.year,
            month:now.month,
            date:now.date
        };
        ele.fadeOut(300,function(){
            $(this).remove();
        });
        $("#jdate-overlay").fadeOut(300);
    }

    //显示
    function _show(ele){
        ele.fadeIn(300);
        var $overlay=$("#jdate-overlay");
        if($overlay.length<1){
            $("body").append('<div id="jdate-overlay"></div>');
        }
        $overlay.fadeIn(300);
    }

    $.fn.jdate = function() {
        return $(this).each(function() {
            var $self = $(this);

            var init=function(){

                var val = $self.val()=="" ? null: $self.val().replace(/-/g,"/");
                var jdate = new Jdate();
                //如果input没有值的话，日期初始化以今天为准，否则以input中的日期为准
                if(!val){
                    jdate.init($self,now.year,now.month,now.date);
                }
                else{
                    var tempdate=new Date(val);
                    //设置当前选中的日期为input中的日期
                    selectedDate.year=tempdate.getFullYear();
                    selectedDate.month=tempdate.getMonth()+1;
                    selectedDate.date=tempdate.getDate();
                    jdate.init($self,selectedDate.year,selectedDate.month);
                }
            };
            //当input获取焦点时打开日期选择器
            $self.focus(init);
        });
    }

})(Zepto, document, window);