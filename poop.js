//Dependencies
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var twitter = require('twitter');
var fs = require('fs');
var url = "http://www.winnipeg.ca/waterandwaste/sewage/service_int.stm"

var secret = {
  consumer_key: 'rOP6l7AbS9YShLnCW6Fb38YPg',
  consumer_secret: 'hzl8snBJ7vpcQC8bjqbB9YfbGAJTeyXQFVamh52hsKkmBxb9aQ',
  access_token_key: '845065226827509760-8v0QKpuJ1Mb4ELiKtb3vTxZc2GZ4UZQ',
  access_token_secret: 'w6J2hlmtwAUY4YwvNTEUW62Y9HSbFShZQqZ9jsIxAx4hE'
}
var Twitter = new twitter(secret);


request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var poopDate = $('table[class=altShade] tr:nth-child(2) td:nth-child(1)');
    var poopLocation = $('table[class=altShade] tr:nth-child(2) td:nth-child(2)');
    var poopAmount = $('table[class=altShade] tr:nth-child(2) td:nth-child(3)');
    var poopDuration = $('table[class=altShade] tr:nth-child(2) td:nth-child(4)');
    var poopCause = $('table[class=altShade] tr:nth-child(2) td:nth-child(5)');
    var updateDate = $('div [id=lastUpdateDate]');


    //Get current year
    var dateToday = new Date();
    var thisYear = dateToday.getFullYear();


    //and the page update date
    var UpdateDateText = updateDate.text();//get date as text
    var parseUpdateDate = new Date(UpdateDateText); // parse date

    //let's deal with the date the last dump took place
    var poopDateText = poopDate.text() + ' ' + thisYear;
    var dateParse = new Date(poopDateText);


    //location and amount, cause, duration
    var poopLocationText = poopLocation.text();
    var poopAmountText = poopAmount.text();
    if (poopAmountText === "Unknown") {
      poopAmountText = "an unknown amount of poop"
    }
    var poopDurationText = poopDuration.text();
    var poopCauseText = poopCause.text();


    var data = 'On ' + poopDateText + ', ' + poopAmountText + ' was released at ' + poopLocationText;


     if (dateToday.toDateString() === parseUpdateDate.toDateString()) {
  /* Twitter.post('statuses/update', {
    status: data
  }, function(error, tweet, response) {
    if (error) {
      console.log(error);
    }
    // Raw response object.
  }); */
  console.log("We have a new poop!")
 } else {
  console.log("No new poops today")
 }
















    




    

   

  })
  // });
