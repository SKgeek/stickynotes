
(function ($) {
    $.fn.memoInit = function (options) {
 
        var settings = $.extend({
            data: 'Hello',
            userId: 'admin',
            memoNumber: '1',
            memoName: 'Memo',
 
            onBlur: function () {
 
            },
            onDelete: function () {
 
 
            },
            onTitleBlur: function () {
 
            },
            onAddNewMemo: function () {
 
            }
           
        }, options);
        createMemo(this, settings.data, settings.userId, settings.memoNumber, settings.memoName, settings.onBlur, settings.onDelete, settings.onTitleBlur, settings.onAddNewMemo);
        return this;
    };
})(jQuery);
 
 
var createMemo = function (mainId, data, userId, memoNumber, memoName, onBlur, onDelete, onTitleBlur, onAddNewMemo) {
    var contentClicked = 0;
    var nameClicked = 0;
    var MemoCounter = 0;
    $(mainId).attr("numberOfMemos",MemoCounter);
    var memoDraggable = function () { //For Memo Dragable
        $(".memo").draggable();
    }
    $(document).on('click', '.memo-content', function () { //To Place Caret at the end of ContentEditable Div
        $(this).focus();
        placeCaretAtEnd(this);
    });
    $(document).on('click', '.memo-name', function () { //To Place Caret at the end of ContentEditable Div
        $(this).focus();
        placeCaretAtEnd(this);
    });
 
 
    var createMemoDiv = function (memoId, memodata) {
        memoNumber++;
        $(mainId).append('<div class="memo" id="' + memoId + '" class="ui-widget-content">'
           + '<div class="head-bar">'
           + '<span class="deleteMemo titleButton " style="float:right" type="button"><span class="glyphicon glyphicon-remove"></span></span>'
           + '<p class="memo-name clickmemoname" style="float:left" contenteditable="true">' + memoName + '</p>'
           + '<span class=" addNewMemo titleButton" style="float:right" type="button"><span class="glyphicon glyphicon-plus"></span></span>'
           + '<span class=" minimizeMemo titleButton" style="float:right" type="button"><span class="glyphicon glyphicon-minus"></span></span>'
           + '</div>'
           + '<div class="memo-content clickmemo" checkClick="0" contenteditable="true" >'
           + '<p>' + memodata + '</p>'
           + '</div>'
           + '</div>');
        memoDraggable();
        MemoCounter++;
        $(mainId).attr("numberOfMemos", MemoCounter);
    }
    createMemoDiv(memoNumber, data);
    //To Append the memo in the particular div
 
 
    function placeCaretAtEnd(el) { //Function To Place Caret at the end of ContentEditable Div
        el.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }
    var addNewMemoInternal = function () {//Function To Add New Memo
        createMemoDiv(memoNumber, data);
        var left = ($('#' + (memoNumber - 2)).css("left"));
        var top = ($('#' + (memoNumber - 2)).css("top"));
 
        var TopLength = top.length - 1;
        var TopPixels = top.substring(0, TopLength);
        var TopFinal = (parseInt(TopPixels) + 330);
 
 
        var LeftLength = left.length - 1;
        var Leftpixels = left.substring(0, LeftLength);
        var final = (parseInt(Leftpixels) + 220);
        console.log(final);
        console.log($(window).width() - 200);
        if (final > ($(window).width() - 200)) {
            console.log(top);
            console.log(TopFinal + "px");
            $('#' + (memoNumber - 1)).css("left", "30%");
            $('#' + (memoNumber - 1)).css("top", (TopFinal + "px"));
        }
        else {
            $('#' + (memoNumber - 1)).css("left", (final + "px"));
            $('#' + (memoNumber - 1)).css("top", top);
        }
 
    }
 
 
    $(document).on('click', '.deleteMemo', function () {
        var memoId = $(this).parent().parent().attr("id");
        onDelete($(this).parent().next().text(), memoId);
        $('#' + memoId).remove();
        MemoCounter--;
        $(mainId).attr("numberOfMemos", MemoCounter);
    });
 
    $(document).on('focusout', '.memo-content', function (e) {
 
        onBlur($(this).text(), $(this).parent().attr("id"));
        $(this).removeClass("memo-content");
 
    });
 
 
    $(document).on('focusout', '.memo-name', function (e) {
        onTitleBlur($(this).text(), $(this).parent().parent().attr("id"));
        $(this).removeClass("memo-name");
    });
 
 
    $(document).on('click', '.clickmemo', function () {
        $(this).addClass("memo-content");
    });
 
 
    $(document).on('click', '.clickmemoname', function () {
        $(this).addClass("memo-name");
    });
 
 
    $(document).on('click', '.addNewMemo', function (e) {
        if ($(".memo-content").is(":focus") || $(".memo-name").is(":focus")) {
 
        }
        else {
            addNewMemoInternal();
            onAddNewMemo();
        }
 
    });
 
}