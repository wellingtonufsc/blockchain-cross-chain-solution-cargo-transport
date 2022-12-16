// 1. Declare global variable to store the smart contract instance
let JourneyContract;

// 2. Set contract address and ABI
var journeyData = [
    { hour: 4, count: 28 },  
    { hour: 5, count: 28 },
    { hour: 6, count: 27 },
    { hour: 7, count: 26.5 },
    { hour: 8, count: 25 },
    { hour: 9, count: 22 },
    { hour: 10, count: 26 },
    { hour: 11, count: 30 },  
    { hour: 12, count: 20 },
    { hour: 13, count: 24 },
    { hour: 14, count: 23.5 },
    { hour: 15, count: 27 },
    { hour: 16, count: 26 },
    { hour: 17, count: 29 },
  ];
const mappingValues = []
const JourneyContractAddress = "0xDd15a88b5a9d3f7CB8a57EBd462a4b4CDFdEc55A";
const JourneyContractABI = [
	{
		"inputs": [],
		"name": "getAllInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "data",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "publisher",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "travel",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastLocation",
						"type": "string"
					}
				],
				"internalType": "struct Journey.returningEverything",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHashData",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTravel",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getpublisher",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "journeyData",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "journeyPublisher",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "journeyTravel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "journeyLastLocation",
				"type": "string"
			}
		],
		"name": "setNewJourney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

/* 3. Prompt user to sign in to MetaMask */
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance of pet smart contract */
    JourneyContract = new ethers.Contract(
      JourneyContractAddress,
      JourneyContractABI,
      signer
    );
  });
});

// 4. Creating variables for reusable dom elements
const journeyFormSection = document.querySelector(".journey-form-section");
const showJourneyFormBtn = document.querySelector(".show-journey-form-btn");
const journeySection = document.querySelector(".journey-detail-section");
const setJourneyButton = document.querySelector("#set-new-journey");
const refreshBtn = document.querySelector(".refresh-journey-details-btn");

/* 5. Function to set pet details */
const setNewJourneyInTheContract = () => {
  // update button value
  setJourneyButton.value = "Setting Journey...";

  /* 5.1 Get inputs from pet form 
  const journeyDataInput = document.querySelector("#journey-data");
  const journeyPublisherInput = document.querySelector("#journey-publisher");
  const journeyTravelInput = document.querySelector("#journey-travel");
  const journeyLastLocationInput = document.querySelector("#journey-lastlocation");
	*/
  // 5.2 Getting values from the inputs
  //const journeyData = journeyDataInput.value;
  //const journeyPublisher = journeyPublisherInput.value;
  //const journeyTravel = journeyTravelInput.value;
  //const journeyLastLocation = journeyLastLocationInput.value;
  const mappingValues = [];
  var aux = [];
  for (var i=0; i<journeyData.length;++i) {
	  if (aux.length == 2) {
		  aux = [];
	  }
	  for ([key,value] of Object.entries(journeyData[i])) {
		  aux.push(value);
  }
	  mappingValues.push(aux);
  }
  mappingValues = mappingValues.toString();
  const journeyPublisher = "Rafael";
  const journeyTravel = "Floripa->Curitiba";
  const journeyLastLocation = "Curitiba";

  /* 5.3 Set pet details in smart contract */
  JourneyContract.setNewJourney(mappingValues, journeyPublisher, journeyTravel, journeyLastLocation)
    .then(() => {
      // update button value
      setJourneyButton.value = "journey set...";

      /* 5.4 Reset form
      journeyDataInput.value = "";
      journeyPublisherInput.value = "";
      journeyTravelInput.value = "";
      journeyLastLocationInput.value = "";
	  */
      // update button value
      setJourneyButton.value = "Set journey";

      /* 5.5 Get pet details from smart contract */
      getCurrentJourney();
    })
    .catch((err) => {
      // If error occurs, display error message
      setJourneyButton.value = "Set journey";
      alert("Error setting journey details" + err.message);
    });
};

/* Function to set pet details on click of button */
setJourneyButton.addEventListener("click", setNewJourneyInTheContract);

/* 6. Function to get pet details */
const getCurrentJourney = async () => {
	setJourneyButton.value = "Getting journey...";

  /* 6.1 Get pet details from smart contract */
  const journey = await JourneyContract.getAllInfo();

  /* 6.2 Display the pet details section
  and
  Hide the pet form in the DOM */
  journeySection.style.display = "block";
  journeyFormSection.style.display = "none";

  /* 6.3 Pet is an array of 3 strings [travelData, travelPublisher, travel] */
  const journeyData = journey[0];
  const journeyPublisher = journey[1];
  const journeyTravel = journey[2];
  const journeyLastLocation = journey[3];

  /* 6.4 Display pet details in DOM */
  document.querySelector(".journey-detail-data").innerText = journeyData;
  document.querySelector(".journey-detail-publisher").innerText = journeyPublisher;
  document.querySelector(".journey-detail-travel").innerText = journeyTravel;
  document.querySelector(".journey-detail-lastlocation").innerText = journeyLastLocation;

  var ethHash = JourneyContract.getHashData().toString();
  const iotaHash = "comparar."
	if (ethHash == iotaHash) {
		console.log("VALID!");
	} else {
		console.log("NOT VALID!");
	}
};

/* 7. Function to show the pet form on click of button */
showJourneyFormBtn.addEventListener("click", () => {
	journeySection.style.display = "none";
	journeyFormSection.style.display = "block";
	setJourneyButton.value = "Submit";
});

/* 8. Function to refresh pet details */
refreshBtn.addEventListener("click", (e) => {
  e.target.innerText = "Refreshing...";
  getCurrentTravel().then(() => {
    e.target.innerText = "Refreshed";
    setTimeout(() => {
      e.target.innerText = "Refresh";
    }, 2000);
  });
});
