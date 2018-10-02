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
                one_day(stock);
                break;
            case '1m':
                one_month(stock);
                break;
            case '3m':
                three_month(stock);
                break;
            case '6m':
                six_month(stock);
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
            var everything ="<h4>You selected a ONE MONTH report:</h4>";
            var low, high = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_date = parsed_json[0]['date'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_date = parsed_json[parsed_json.length - 1]['date'];
            var change, change_sign = diff(opening, closing);
            everything+="<p>Over the last month " + stock + " had a low point of " + low + "and a high point of " + high + ".";
            everything +="They had a starting price of " + opening + " on " + o_date + " and a ending price of " + closing + " on " + c_date + " yeilding a " + change_sign + " of $" + change + ".</p>";
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
            var low, high = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_time = parsed_json[0]['label'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_time = parsed_json[parsed_json.length - 1]['label'];
            var change, change_sign = diff(opening, closing);
            everything+="<p>Today " + stock + " had a low point of " + low + "and a high point of " + high + ".";
            everything +="They had a starting price of " + opening + " at " + o_time + " and a ending price of " + closing + " at " + c_time + " yeilding a " + change_sign + " of $" + change + ".</p>";
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
            var low, high = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_date = parsed_json[0]['date'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_date = parsed_json[parsed_json.length - 1]['date'];
            var change, change_sign = diff(opening, closing);
            everything+="<p>Over the last three months " + stock + " had a low point of " + low + "and a high point of " + high + ".";
            everything +="They had a starting price of " + opening + " on " + o_date + " and a ending price of " + closing + " on " + c_date + " yeilding a " + change_sign + " of $" + change + ".</p>";
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
            var low, high = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_date = parsed_json[0]['date'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_date = parsed_json[parsed_json.length - 1]['date'];
            var change, change_sign = diff(opening, closing);
            everything+="<p>Over the last six months " + stock + " had a low point of " + low + "and a high point of " + high + ".";
            everything +="They had a starting price of " + opening + " on " + o_date + " and a ending price of " + closing + " on " + c_date + " yeilding a " + change_sign + " of $" + change + ".</p>";
            $("#results").html(everything);
        }
    })
}

function get_low_high(json)
{
    var worst_so_far = Infinity;
    var best_so_far = 0;
    for(var i; i < json.length; i++)
    {
        if(json[i]['low'] < worst_so_far)
        {
            worst_so_far = json[i]['low'];
        }
        if(json[i]['high'] > best_so_far)
        {
            best_so_far = json[i]['high'];
        }
    }
    return worst_so_far, best_so_far;
}

function book(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/book";
    $.ajax({
        url: myurl,
        dataType: "json",
        success: function(parsed_json)
        {
            var open = parsed_json['open'];
            var close = parsed_json['close'];
            var change, sign = diff(open, close);
            var ytd, ytd_sign = getytd(parsed_json['ytdChange']);
            var everything ="<h4>You selected a BOOK report for " + parsed_json['companyName'] + ":</h4>";
            everything+="<p>Today " + stock + " had a low point of $" + parsed_json['low'] + "and a high point of $" + parsed_json['high'] + ".";
            everything +="They had a opening price of $" + open + " and a ending price of $" + close + "yeilding a " + sign + " of $" + change + ".";
            everything += " They had a 52 week high of " + parsed_json['week53High'] + " and a 52 week low of " + parsed_json['week53Low'] + ". ";
            everything += "Year-to-Day change is at " + ytd + " so the stock is looking " + ytd_sign +".";
            $("#results").html(everything);
        }
    })
}

function getytd(number)
{
    if(number < 0)
    {
        return number, "weak";
    }
    else if(number > 0)
    {
        return number, "strong";
    }
    else if(number == 0)
    {
         return number, "neutral";
    }
}

function diff(first, second)
{
    var temp = first - second;
    if(temp < 0)
    {
        temp = temp + (2*temp);
        return temp, "increase";
    }
    else if(temp > 0)
    {
        return temp, "decrease";
    }
    else if(temp == 0)
    {
        return temp, "constant";
    }
}