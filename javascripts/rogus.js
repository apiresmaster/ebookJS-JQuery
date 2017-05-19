/**
***
**/
$(function(){
	$(".quantity").change(function() {
		writeTotal(calculateTotalProducts());	
	});	
});

function moneyTextToFloat(text) {
	var cleanText = text.replace("R$ ", "").replace(",", ".");
	return parseFloat(cleanText);
}

function floatToMoneyText(value) {
	var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
	text = "R$ " + text;
	return text.substr(0, text.length - 2) + "," + text.substr(-2);
}

function readTotal() {
	var total = $("#total").text();
	return moneyTextToFloat(total);
}

function writeTotal(value) {
	var text = floatToMoneyText(value);
	$("#total").text(text);
}

function calculateTotalProducts() {
	var produtos = $(".produto")
	var total = 0;

	$(produtos).each(function(pos, produtos){
		var $produto = $(produto);
		var quantity = moneyTextToFloat($produto.find(".quantity").val());
		var price = moneyTextToFloat($produto.find(".price").text());

		total += quantity * price;
	});

	return total;
}