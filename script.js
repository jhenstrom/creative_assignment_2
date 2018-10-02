/*global $*/
$(document).ready(function() 
{
    $("#submit").click(function(e)
    {
        
        var stock = $('input[name=stocks]:checked', '#myForm').val();
        var report_type = $('input[name=report_type]:checked', '#myForm').val();
        
        console.log(stock);
        console.log(report_type);
        e.preventDefault();
        switch (report_type) {
            case '1d':
                book(stock);
                break;
            case '1m':
                book(stock);
                break;
            case '3m':
                book(stock);
                break;
            case '6m':
                book(stock);
                break;
            case 'book':
                book(stock);
                break;
            default:
                break;
        }
    });
});

function one_month(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/chart/1m";
    $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json)
            {
                var everything ="<h4>You selected a THREE MONTH report:</h4>";
                everything+="<p>Over the last month " + stock + " had a low point of " + low + "and a high point of " + high + ".";
                everything +="They had a starting price of " + opening + " and a ending price of " + closing + "yeilding a " + change_sign + " of $" + change + ".</p>";
                $("#results").html(everything);
            }
        })
}

function one_day(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/chart/1d";
    $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json)
            {
                var everything ="<h4>You selected a ONE DAY report:</h4>";
                everything+="<p>Today " + stock + " had a low point of " + low + "and a high point of " + high + ".";
                everything +="They had a opening price of " + opening + " and a ending price of " + closing + "yeilding a " + change_sign + " of $" + change + ".</p>";
                $("#results").html(everything);
            }
        })
}

function three_month(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/chart/3m";
    $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json)
            {
                var everything ="<h4>You selected a THREE MONTH report:</h4>";
                everything+="<p>Over the last three months " + stock + " had a low point of " + low + "and a high point of " + high + ".";
                everything +="They had a starting price of " + opening + " and a ending price of " + closing + "yeilding a " + change_sign + " of $" + change + ".</p>";
                $("#results").html(everything);
            }
        })
}

function six_month(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/chart/6m";
    $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json)
            {
                var everything ="<h4>You selected a SIX MONTH report:</h4>";
                everything+="<p>Over the last six months " + stock + " had a low point of " + low + "and a high point of " + high + ".";
                everything +="They had a starting price of " + opening + " and a ending price of " + closing + "yeilding a " + change_sign + " of $" + change + ".</p>";
                $("#results").html(everything);
            }
        })
}

function book(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/book";
    $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json)
            {
                var everything ="<h4>You selected a BOOK report:</h4>";
                everything+="<p>Today " + stock + " had a low point of " + low + "and a high point of " + high + ".";
                everything +="They had a opening price of " + opening + " and a ending price of " + closing + "yeilding a " + change_sign + " of $" + change + ".";
                everything += " They had a 52 week high of " + fifty_two_week_high + " and a 52 week low of " +  + ". ";
                everything += "Year-to-Day change is at " + ytd + " so the stock is looking " + ytd_sign +".";
                $("#results").html(everything);
            }
        })
}