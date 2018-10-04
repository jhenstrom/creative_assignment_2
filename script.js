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
    console.log(myurl);
    $.ajax({
        url: myurl,
        dataType: "json",
        success: function(parsed_json)
        {
            var everything ="<h4>You selected a <b>ONE MONTH</b> report:</h4>";
            var stats = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_date = parsed_json[0]['date'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_date = parsed_json[parsed_json.length - 1]['date'];
            var change = diff(opening, closing);
            everything+="<p>Over the last month <b>" + stock.toUpperCase() + "</b> had a low point of <b>$" + stats[0].toFixed(2) + "</b> and a high point of <b>$" + stats[1].toFixed(2) + "</b>. ";
            everything +="They had a starting price of <b>$" + opening.toFixed(2) + "</b> on <b>" + o_date + "</b> and a ending price of <b>$" + closing.toFixed(2) + "</b> on <b>" + c_date + "</b> yeilding a <b>" + change[1] + "</b> of <b>$" + change[0].toFixed(2) + "</b>.</p>";
            $("#results").html(everything);
        }
    })
}

function one_day(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/chart/1d";
    console.log(myurl);
    $.ajax({
        url: myurl,
        dataType: "json",
        success: function(parsed_json)
        {
            var everything ="<h4>You selected a <b>ONE DAY</b> report:</h4>";
            var stats = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_time = parsed_json[0]['label'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_time = parsed_json[parsed_json.length - 1]['label'];
            var change = diff(opening, closing);
            everything+="<p>Today <b>" + stock.toUpperCase() + "</b> had a low point of <b>$" + stats[0].toFixed(2) + "</b> and a high point of <b>$" + stats[1].toFixed(2) + "</b>. ";
            try
            {
            everything +="They had a starting price of <b>$" + opening.toFixed(2) + "</b> at <b>" + o_time + "</b> and a ending price of <b>$" + closing.toFixed(2) + "</b> at <b>" + c_time + "</b> yeilding a <b>" + change[1] + "</b> of <b>$" + change[0].toFixed(2) + "</b>.</p>";
            }
            catch(Exception){
                
            }
            $("#results").html(everything);
        }
    })
}

function three_month(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/chart/3m";
    console.log(myurl);
    $.ajax({
        url: myurl,
        dataType: "json",
        success: function(parsed_json)
        {
            var everything ="<h4>You selected a <b>THREE MONTH</b> report:</h4>";
            var stats = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_date = parsed_json[0]['date'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_date = parsed_json[parsed_json.length - 1]['date'];
            var change = diff(opening, closing);
            everything+="<p>Over the last three months <b>" + stock.toUpperCase() + "</b> had a low point of <b>$" + stats[0].toFixed(2) + "</b> and a high point of <b>$" + stats[1].toFixed(2) + "</b>. ";
            everything +="They had a starting price of <b>$" + opening.toFixed(2) + "</b> on <b>" + o_date + "</b> and a ending price of <b>$" + closing.toFixed(2) + "</b> on <b>" + c_date + "</b> yeilding a <b>" + change[1] + "</b> of <b>$" + change[0].toFixed(2) + "</b>.</p>";
            $("#results").html(everything);
        }
    })
}

function six_month(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/chart/6m";
    console.log(myurl);
    $.ajax({
        url: myurl,
        dataType: "json",
        success: function(parsed_json)
        {
            var everything ="<h4>You selected a <b>SIX MONTH</b> report:</h4>";
            var stats = get_low_high(parsed_json);
            var opening = parsed_json[0]['open'];
            var o_date = parsed_json[0]['date'];
            var closing = parsed_json[parsed_json.length - 1]['close'];
            var c_date = parsed_json[parsed_json.length - 1]['date'];
            var change = diff(opening, closing);
            everything+="<p>Over the last six months <b>" + stock.toUpperCase() + "</b> had a low point of <b>$" + stats[0].toFixed(2) + "</b> and a high point of <b>$" + stats[1].toFixed(2) + "</b>. ";
            everything +="They had a starting price of <b>$" + opening.toFixed(2) + "</b> on <b>" + o_date + "</b> and a ending price of <b>$" + closing.toFixed(2) + "</b> on <b>" + c_date + "</b> yeilding a <b>" + change[1] + "</b> of <b>$" + change[0].toFixed(2) + "</b>.</p>";
            $("#results").html(everything);
        }
    })
}

function get_low_high(json)
{
    var worst_so_far = Infinity;
    var best_so_far = 0;
    for(var i = 0; i < json.length; i++)
    {
        console.log(json[i]['low']);
        console.log(json[i]['high']);
        if(json[i]['low'] < worst_so_far && json[i]['low'] != -1)
        {
            worst_so_far = json[i]['low'];
        }
        if(json[i]['high'] > best_so_far)
        {
            best_so_far = json[i]['high'];
        }
    }
    return [worst_so_far, best_so_far];
}

function book(stock)
{
    var myurl= "https://api.iextrading.com/1.0/stock/" + stock + "/book";
    console.log(myurl);
    $.ajax({
        url: myurl,
        dataType: "json",
        success: function(parsed_json)
        {
            var open = parsed_json['quote']['open'];
            var close = parsed_json['quote']['close'];
            var change= diff(open, close);
            var ytd = getytd(parsed_json['quote']['ytdChange']);
            var everything ="<h4>You selected a <b>BOOK</b> report:</h4>";
            everything+="<p>Today <b>" + stock.toUpperCase() + "</b> had a low point of <b>$" + parsed_json['quote']['low'].toFixed(2) + "</b> and a high point of <b>$" + parsed_json['quote']['high'].toFixed(2) + "</b>. ";
            everything +="They had a opening price of <b>$" + open.toFixed(2) + "</b> and a ending price of <b>$" + close.toFixed(2) + "</b> yeilding a <b>" + change[1] + "</b> of <b>$" + change[0].toFixed(2) + "</b>. ";
            everything += " They had a 52 week high of <b>$" + parsed_json['quote']['week52High'].toFixed(2) + "</b> and a 52 week low of <b>$" + parsed_json['quote']['week52Low'].toFixed(2) + "</b>. ";
            everything += "Year-to-Day change is <b>$ " + ytd[0].toFixed(2) + "</b> so the stock is looking <b>" + ytd[1] +"</b>.";
            $("#results").html(everything);
        }
    })
}

function getytd(number)
{
    if(number < -0.1)
    {
        return [number, "weak"];
    }
    else if(number > 0.1)
    {
        return [number, "strong"];
    }
    else
    {
         return [number, "steady"];
    }
}

function diff(first, second)
{
    var temp = first - second;
    if(temp < 0)
    {
        return [Math.abs(temp), "increase"];
    }
    else if(temp > 0)
    {
        return [Math.abs(temp), "decrease"];
    }
    else if(temp == 0)
    {
        return [Math.abs(temp), "constant"];
    }
}