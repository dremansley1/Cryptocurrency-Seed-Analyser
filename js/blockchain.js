/*******
 * THe Blockchain Class Code that I have developed for the Final Year Cryptocurrency Project
 */

var DOM = {};
// Document ID elements of the web application for ease of access throughout the code
DOM.MS = document.getElementById("mnemonicseedentered");
DOM.WS = document.getElementById("phrase");
DOM.NP = document.getElementById("network-phrase");
DOM.AOC = document.getElementById("addresses-output-container");
DOM.AO = document.getElementById("address-output");
DOM.DU = document.getElementById("derivationUsed");
DOM.BU = document.getElementById("blockchainUsed");
DOM.AC = document.getElementById("address_count");
DOM.FB = document.getElementById("total_balance");
DOM.TS = document.getElementById("total_sent");
DOM.TR = document.getElementById("total_received");
DOM.DP32 = document.getElementById("bip32-path").value;
DOM.DP32C = document.getElementById("bip32-client");
DOM.DP44 = document.getElementById("bip44-path").value;
DOM.DP49 = document.getElementById("bip49-path").value;
DOM.DP84 = document.getElementById("bip84-path").value;
DOM.DP141 = document.getElementById("bip141-path").value;
DOM.HAC = document.getElementById("hardened-addresses-checkbox");
DOM.EXP = document.getElementById("PDF-Export-Section");
DOM.LD = document.getElementById("loader");

class Blockchain {
    constructor(coin, networkName, walletAddresses, derivationType) {
        this.coin = coin;
        this.walletAddresses = walletAddresses;
        this.devType = derivationType;
        this.network = networkName;
    }
    initialise() {
        // call function to detect blockchain network, and then pass returned values into the API connection
        this.blockchainAPIConnection(this.blockchainNetwork());
    }

    bip44Blockchains() {
        // Blockchain API's to use when BIP44 derivation is selected
        var blockchain44 = "";
        var apiDetails44 = [];
        var ext = "";
        var type = "";
        var delimiter = "";

        // detect which network was selected and assign appropriate blockchain
        switch (this.network) {
            case "ETH - Ethereum":
                blockchain44 = "https://api.ethplorer.io/getAddressInfo/";
                ext = "?showETHTotals=true&apiKey=EK-2VyLa-DhJ5UYC-qd5bU";
                type = "single";
                delimiter = "";
                break;
            case "BTC - Bitcoin":
                blockchain44 = "https://blockchain.info/multiaddr?active=";
                ext = "";
                type = "multi";
                delimiter = "|";
                break;
            default:
                blockchain44 = "None";
        }
        // push all details inside an array that will be used through the upcoming processes
        apiDetails44.push(headers, blockchain44, ext, type, delimiter);
        return apiDetails44;
    }

    bip49Blockchains() {
        // Blockchain API's to use when BIP49 derivation is selected
        var blockchain49 = "";
        var apiDetails49 = [];
        var ext = "";
        var type = "";
        var delimiter = "";
        // detect which network was selected and assign appropriate blockchain
        switch (this.network) {
            case "ETH - Ethereum":
                blockchain49 = "https://api.ethplorer.io/getAddressInfo/";
                ext = "?showETHTotals=true&apiKey=EK-2VyLa-DhJ5UYC-qd5bU";
                type = "single";
                delimiter = "";
                break;
            case "BTC - Bitcoin":
                blockchain49 = "https://blockchain.info/multiaddr?active=";
                ext = "";
                type = "multi";
                delimiter = "|";
                break;
            default:
                blockchain49 = "None";
        }
        // push all details inside an array that will be used through the upcoming processes
        apiDetails49.push(headers, blockchain49, ext, type, delimiter);
        return apiDetails49;
    }

    bip84Blockchains() {
        // Blockchain API's to use when BIP49 derivation is selected
        var blockchain84 = "";
        var apiDetails84 = [];
        var ext = "";
        var type = "";
        var delimiter = "";
        // detect which network was selected and assign appropriate blockchain
        switch (this.network) {
            case "ETH - Ethereum":
                blockchain84 = "https://api.ethplorer.io/getAddressInfo/";
                ext = "?showETHTotals=true&apiKey=EK-2VyLa-DhJ5UYC-qd5bU";
                type = "single";
                delimiter = "";
                break;
            case "BTC - Bitcoin":
                blockchain84 = "https://blockchain.info/multiaddr?active=";
                ext = "";
                type = "multi";
                delimiter = "|";
                break;
            default:
                blockchain84 = "None";
        }
        // push all details inside an array that will be used through the upcoming processes
        apiDetails84.push(headers, blockchain84, ext, type, delimiter);
        return apiDetails84;
    }

    blockchainNetwork() {
        var apiDetails = [];
        // check which derivation tab was selected by the user and call the appropriate function
        if (this.devType === "bip32-tab") {
            apiDetails = this.bip44Blockchains();
        } else if (this.devType === "bip44-tab") {
            apiDetails = this.bip44Blockchains();
        } else if (this.devType === "bip49-tab") {
            apiDetails = this.bip49Blockchains();
        } else if (this.devType === "bip84-tab") {
            apiDetails = this.bip84Blockchains();
        }

        return apiDetails;
    }

    processData(blockchainData, apiDetails, apiType) {
        // process the data returned by the blockchain API
        var balance_totals = {};
        var addresses_balances = [];
        var temp_address_list = {};
        var balance_all = 0;
        var total_out = 0;
        var total_in = 0;

        // Run code if Ethereum was selected from the list of cryptocurrencies
        if (this.network === "ETH - Ethereum") {

            for (var ethw = 0; ethw < blockchainData.length; ethw++) {
                // read through each line of data from API result, add up the total balances
                balance_all += blockchainData[ethw]["ETH"]["balance"];
                total_out += blockchainData[ethw]["ETH"]["totalOut"];
                total_in += blockchainData[ethw]["ETH"]["totalIn"];

                
                // read each address and their balance and add them to a list called addresses_balances
                temp_address_list = {};
                temp_address_list["address"] = blockchainData[ethw]["address"];
                temp_address_list["totalOut"] = blockchainData[ethw]["ETH"]["totalOut"];
                temp_address_list["totalIn"] = blockchainData[ethw]["ETH"]["totalIn"];
                temp_address_list["balance"] = blockchainData[ethw]["ETH"]["balance"];
                addresses_balances.push(temp_address_list);

            }
        
            // set the final calcualted totals of the balances into a list called balance_totals
            balance_totals["final_balance"] = balance_all;
            balance_totals["total_sent"] = total_out;
            balance_totals["total_received"] = total_in;

            // call functions to display the balances, and addresses
            this.showBalances(balance_totals);
            this.showAddresses(addresses_balances, apiDetails[0]);
        }
        // Run code if Bitcoin was selected from the list of cryptocurrencies
        if (this.network === "BTC - Bitcoin") {

            for (var btcw = 0; btcw < blockchainData["addresses"].length; btcw++) {
                // read through the addresses returned from the API, fetch the required values
                temp_address_list = {};
                temp_address_list["address"] = blockchainData["addresses"][btcw]["address"];
                temp_address_list["totalOut"] = blockchainData["addresses"][btcw]["total_sent"];
                temp_address_list["totalIn"] = blockchainData["addresses"][btcw]["total_received"];
                temp_address_list["balance"] = blockchainData["addresses"][btcw]["final_balance"];
                addresses_balances.push(temp_address_list);
            }
            // call functions to display the balances, and addresses
            this.showBalances(blockchainData["wallet"]);
            this.showAddresses(addresses_balances, apiDetails[0]);
        }
    }

    crypto2gbp(crypto) {
        // function to convert a crypto based value into a GBP £ equivalent
        var gbpvalue, result, conversion;
        if (this.network === "ETH - Ethereum") {
            // read the GBP value of Ethereum
            gbpvalue = cryptogbp["ethereum"]["gbp"];
            result = crypto * gbpvalue;
        } else if (this.network === "BTC - Bitcoin") {
            // read the GBP value of Bitcoin
            gbpvalue = cryptogbp["bitcoin"]["gbp"];
             // convert the crypto to 8 decimal places
        conversion = crypto * (0.00000001).toFixed(8);
        result = conversion * gbpvalue;
        }
    
        return result;
    }

    showBalances(balances) {
        // assign the balances to variables
        var final_balance = this.crypto2gbp(balances["final_balance"]);
        var total_sent = this.crypto2gbp(balances["total_sent"]);
        var total_received = this.crypto2gbp(balances["total_received"]);

        //convert the balances into a GBP format and display wallet balances out to the user
        DOM.FB.innerHTML = currencyFormat.format(final_balance);
        DOM.TS.textContent = currencyFormat.format(total_sent);
        DOM.TR.textContent = currencyFormat.format(total_received);
    }

    createTable(tableData, headers) {
        // create table elements
        var table = document.createElement("table");
        var tableHead = document.createElement("thead");
        var tableBody = document.createElement("tbody");
        var addrCount = 0;
        // append the table head to the table
        table.appendChild(tableHead);
        // loop through table header names and create a table heading for each
        for (var i = 0; i < headers.length; i++) {
            if (i == 1) {
                // create a new table heading called Private Key
                tableHead
                    .appendChild(document.createElement("th"))
                    .appendChild(document.createTextNode("Private Key"));
            }
            tableHead
                .appendChild(document.createElement("th"))
                .appendChild(document.createTextNode(headers[i]));
        }

        table.setAttribute("class", "table known-addresses");
        // loop through all data received from the Blockchain API
        for (i = 0; i < tableData.length; i++) {
            // if one of the returned addresses contains a balance that is greater than 0
            if (tableData[i]['balance'] !== 0 || tableData[i]['totalIn'] !== 0) {
                // create a table row to display address information
                var row = document.createElement("tr");
                for (var j = 0; j < this.walletAddresses.length; j++) {
                    // loop through the walletaddress and then check against the walletaddresses created upon derivation (which are created from IanColeman code)
                    var y = JSON.stringify(this.walletAddresses[j]["address"].toUpperCase());
                    var z = JSON.stringify(tableData[i]["address"].toUpperCase());

                    if (y == z) {
                        // if there's a match between the 2 addresses, fetch the associated private key
                        var privateKey = this.walletAddresses[j]["privkey"];
                    }
                }
                // increase the counter for number of addresses and wallets with value
                addrCount += 1;

                // loop through the count of headers
                for (var x = 0; x < headers.length; x++) {
                    if (x == 1) {
                        // create table cell of private key next to the output of wallet address
                        var cell = document.createElement("td");
                        cell.textContent = privateKey;
                        row.appendChild(cell);
                    }
                    // fetch value from JSON using index and key value (header name)
                    var a = headers[x];
                    var vals = tableData[i][a];
                    var cell = document.createElement("td");
                    if (x >= 3) {
                        cell.textContent = currencyFormat.format(this.crypto2gbp(vals));
                        if (tableData[i]['balance'] !== 0) {
                            // if balance is not zero, then set the balance colour to green and bold
                            cell.setAttribute("style", "color: #009432; font-weight:bold");
                        } else if (tableData[i]['totalIn'] !== 0) {
                            cell.setAttribute("style", "color: red; font-weight:bold");
                        }
                    } else if (x > 0 && x < 3) {
                        // convert values to GBP and format the GBP value and then set table cell text to the result
                        cell.textContent = currencyFormat.format(this.crypto2gbp(vals));
                    } else {
                        cell.textContent = vals;
                    }

                    row.appendChild(cell);
                }
                // add table row to the table
                tableBody.appendChild(row);
            }
        }
        table.appendChild(tableBody);
        DOM.AC.innerHTML = addrCount;

        return table;
    }

    showAddresses(addresses, apiAddressHeaders) {
        // show the addresses to the user and hide the loading animation
        DOM.AO.innerHTML = "";
        DOM.LD.style.visibility = "hidden";
        // call the create table function, results returned and appended to HTML element
        DOM.AO.appendChild(this.createTable(addresses, headers));
        // if there were no wallet with balances then show 'No Results Found'
        if (DOM.AC.innerHTML == "0") {
            DOM.AO.innerHTML = "<p class='small-text red'>No Results Found</p>";
        }
        var end = Date.now();
        console.log(`Execution time: ${end - start} ms`);
    }

    blockchainAPIConnection(apiDetails) {
        // variables containing information needed to create the URL for the API query
        var apiAddr = apiDetails[1];
        var apiExt = apiDetails[2];
        var apiType = apiDetails[3];
        var apiDelimiter = apiDetails[4];
        var apiValues = "";
        var apiURL = "";
        var apiSingleAddresses = [];

        async function blockchainQuery() {
            // pass the created API URL into the query and fetch the results
            let blockchainResponse = await fetch(apiURL);
            let blockchainData = await blockchainResponse.json();
            // return all the results back in JSON format
          
            return blockchainData;
        }

        if (apiType == "single") {
            // if the blockchain API only allows 1 addresses per query
            // then create a list of seperate individual URLs to be passed into the API
            var c = 0;
            var apiLimitInterval = setInterval(function() {

                if (c >= walletAddressList.length) {
                    clearInterval(apiLimitInterval);
                    this.processData(apiSingleAddresses, apiDetails, apiType);
                } else {
                    apiURL = apiAddr + walletAddressList[c]["address"] + apiExt;
                    // call the blockchain API and push results into an array
                    blockchainQuery().then((blockchainData) =>
                        apiSingleAddresses.push(blockchainData)
                    );
                    c += 1;
                }
                // loop through code every 0.2 seconds - for API limit rules
            }.bind(this), 200);
        }

        if (apiType == "multi") {

            // if blockchain API allows for mulitple addresses to be sent through in query
            // then append all addresses together using the delimiter

            for (var j = 0; j < this.walletAddresses.length; j++) {
                apiValues += this.walletAddresses[j]['address'] + apiDelimiter;
            }
            // create the final api URL to be used
            apiURL = apiAddr + apiValues + apiExt;
            // call the blockchainAPI query and then pass the results into another function for processing
            blockchainQuery(apiAddr).then((blockchainData) =>
                this.processData(blockchainData, apiDetails, apiType)
            );
        }
    }
}

var walletAddressList = [];
// function to convert a number into a £GBP format (£0,000.00)
var currencyFormat = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
});

// define variables andd headers to be used later when creating tables
var cryptogbp;
var headers = ["address", "totalOut", "totalIn", "balance"]

// if BIP32 derivation method is set to Bitcoin Core then show option to use hardened addresses, else hide
DOM.DP32C.onchange = function() {
    var client_val = this.value;
    if (client_val === "0") {
        DOM.HAC.checked = true;
        DOM.HAC.style.display = "block";
    } else {
        DOM.HAC.checked = false;
        DOM.HAC.style.display = "none";
    }
}

async function fetchGBPValues() {
    // function which fetches the GBP values of Bitcoin and Ethereum
    let gbpquery = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=gbp");
    let priceData = await gbpquery.json();
    return priceData;
}
// call async function as page finishes loading to fetch prices of cryptocurrencies used within the application
fetchGBPValues().then((priceData) => cryptogbp = priceData)

var start;
function blockchainSearch() {
    start = Date.now();
    var derivationPath = "";
    var walletSeed = DOM.WS.value;
    //get derivation settings
    var derivationType = document.querySelector(".derivation-type > li.active").id;
    // detect which derivation tab was selected and then fetch the value. i.e. m/0'/0'
    switch (derivationType) {
        case "bip32-tab":
            derivationPath = DOM.DP32;
            break;
        case "bip44-tab":
            derivationPath = DOM.DP44;
            break;
        case "bip49-tab":
            derivationPath = DOM.DP49;
            break;
        case "bip84-tab":
            derivationPath = DOM.DP84;
            break;
        case "bip141-tab":
            derivationPath = DOM.DP141;
            break;
    }

    // get coin
    var coinSelect = DOM.NP;
    var coinValue = coinSelect.value;
    var networkName = coinSelect.options[coinSelect.selectedIndex].text;
  
    // create new blockchain connection
    if(networkName == "ETH - Ethereum" && (derivationType == "bip49-tab" || derivationType == "bip84-tab" || derivationType == "bip141-tab") || networkName == "BTC - Bitcoin" && (derivationType == "bip141-tab")){
        alert("The blockchain for the selected BIP type has not yet been implemented for this blockchain");
    }
    else{
          // show the loader while the application processes the inputs and retrieves results
    DOM.LD.style.visibility = "visible";
      // output the seed, derivation path, and the selected network to the user
      DOM.MS.innerHTML = walletSeed;
      DOM.DU.innerHTML = derivationPath;
      DOM.BU.innerHTML = networkName;
      DOM.AO.innerHTML = "";
        var blockchainConnection = new Blockchain(coinValue, networkName, walletAddressList, derivationType);
        // initiate the blockchain process
        blockchainConnection.initialise();
    }
}

// create a PDF. External code used to 
function createPDF() {
    const exportSection = DOM.EXP;
    html2pdf().from(exportSection).save();
}