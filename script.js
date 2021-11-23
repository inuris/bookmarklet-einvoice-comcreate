const STATIC = {	
	TaxAuthorityID: "4a041754-ef26-a5db-e050-007f01003860",
	Fax: "",
	ContractName: "",
	BankName: "",
	BankAccount: "",
	BankNumber: "",
	HasContract: "true",
	Email: "1@gmail.com",
	Phone: "",
	Type: "2",
	Region: "5",
	OrgId: "87",	
	TemplateType: "1",
	Serial: "54010101BFD227F36296CA2414AC334E",	
	P12Path: "C%3A%5CEInvoice_Test_16122019.p12",
	P12Pass: "123456",	
	"lstContract[0].No": "",	
	"lstContract[0].ContractDate": new Date().toLocaleDateString('en-gb'),
	"lstContract[0].ContractType": "989d79d3-e93e-4b3d-94ac-a93500ae1890"
};
const URL = "/Initialization/CustomerCreate";


function processBankString(bankstr){
	try{
		if (bankstr){
			let regex = /^([0-9 \\\-\\\.]+)([ \\\-}])(tại)?[ \\\-}]?(.+)$/gi;
			let split = [...bankstr.matchAll(regex)];
			if (split.length>0){
				let number = split[0][1] || "";
				let name = split[0][4] || "";
				number = number.replace(/[ \\\-.]/g,"");
				if (name && number){
					return {name: name, number:number}  
				}      
			}
		}		
	}
	catch(e){
		console.log(e);
	}
	return null;
}
function processPhoneString(phonestr){	
	try{
		if (phonestr){
			let regex = /^([0-9 \\\-\\\.\\\,]+)/g;
			let regMatch = regex.exec(phonestr);
			let result = regMatch[1];
			if (regMatch){
				return regMatch[1]
			}	
		}
	}
	catch(e){
		console.log(e);
	}
	return null;
}
async function updateField(customData) {
	let url = URL;
	let bank = processBankString(customData.comAccount);
	if (bank){
		customData.comBankName = bank.name;
		customData.comBankNumber = bank.number;
	}
	let DYNAMIC = {
		'__RequestVerificationToken' : customData['__RequestVerificationToken'],
		ShortName: customData.comCode,
		CompanyName: customData.comName,		
		Taxcode: customData.comTaxCode,
		RepresentName: customData.comRepresent,
		Address: customData.comAddress,
		SysType: customData.comSys,
		UsingP12: customData.comSys=="1"?"false":"true",
		"lstContract[0]._ContractName": customData.comName,
		"lstContract[0].Quantity": customData.comQty || "300",
		Phone: processPhoneString(customData.comPhone) || "",
		BankNumber: customData.comBankNumber || "",
		BankName: customData.comBankName || "",
		Email: customData.comEmail || "1@gmail.com"
	};
	
	/* Kiểm tra field rỗng */
	for (let key in DYNAMIC) {		
		if (!DYNAMIC[key]){
			/* Nhập thêm tên viết tắt */
			if (key === "ShortName"){
				let ask = prompt("Nhập tên viết tắt");
				if (ask){
					DYNAMIC[key] = ask;
				}
				else {
					return false;
				}
			}
			else
				/* Optional fields */
				if (key !== "Phone" && key !== "BankNumber" && key !== "BankName"){
					return false;
			}			
		}
	}
	/* Thêm vtu cuối comCode */
	if (DYNAMIC.ShortName.indexOf("vtu")<0 && DYNAMIC.SysType==="1"){
		DYNAMIC.ShortName+="vtu";
	}
	
	let submitdata = {...STATIC, ...DYNAMIC};	
	
	/* Tạo boundary khi upload dạng Form */
	var sBoundary = "---------------------------" + Date.now().toString(16);
	let header = {
		"content-type":
			"application/x-www-form-urlencoded; charset=UTF-8; boundary=" + sBoundary,
		accept:
			"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"content-encoding": "gzip"
	};

	let form_data = objectToFormData(submitdata);
	let response = await fetch(url, {
		header: header,
		body: form_data,
		method: "POST"
	});
	let data = await response.text();
	return data;
}

/* convert JSON object to  FormData */
function objectToFormData(obj, rootName, ignoreList) {
	var formData = new FormData();
	function appendFormData(data, root) {
		if (!ignore(root)) {
			root = root || "";
			if (data instanceof File) {
				formData.append(root, data);
			} else if (Array.isArray(data)) {
				for (let data_i = 0; data_i < data.length; data_i++) {
					appendFormData(data[data_i], root + "[" + data_i + "]");
				}
			} else if (typeof data === "object" && data) {
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						if (root === "") {
							appendFormData(data[key], key);
						} else {
							appendFormData(data[key], root + "." + key);
						}
					}
				}
			} else {
				if (data !== null && typeof data !== "undefined") {
					formData.append(root, data);
				}
			}
		}
	}
	function ignore(root) {
		return (
			Array.isArray(ignoreList) &&
			ignoreList.some(function (x) {
				return x === root;
			})
		);
	}
	appendFormData(obj, rootName);
	return formData;
}
function newElement(tag, isBlock, { ...attArray }) {
  let newElement = document.createElement(tag);
  let style = Object.keys(attArray);
  for (let i = 0; i < style.length; i++) {
    newElement[style[i]] = attArray[style[i]];
  }
  /* Wrap in new div if isBlock = true */
  if (isBlock) {
    let newBlock = document.createElement("div");
    newBlock.appendChild(newElement);
    return newBlock;
  }
  return newElement;
}

/**
 * Creat Popup
 */
function creatPopup() {
  /* CSS for popup classes */
  let style = newElement("style", false, {
    innerHTML: "#_ext_close{padding: 5px 7px !important; font-size: 10px !important; position:absolute !important; right:0 !important; top:0 !important; margin-bottom: 5px !important;background: #ddd !important; border: 1px solid #ddd !important; cursor: pointer}"+
"._ext_input{margin-bottom: 5px !important; padding: 3px 5px !important; color: #000; width: 400px !important}"+
"#_ext_buttonDownload{width: 120px; height: 36px; background: #0a6b34; border: none; border-radius: 2px; color: #fff;}"+
"#_ext_buttonDownload:hover{background: #119149; cursor: pointer}"+
"#_ext_popup{position:fixed; z-index: 99999; top:0; left: 0; background: #fff; padding: 30px 15px 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);}",
    type: "text/css"
  });

  let popup = newElement("div", false, {
    id: "_ext_popup"
  });
  popup.appendChild(style);

  let close = newElement("button", false, {
    id: "_ext_close",
    innerText: "<<"
  });
  close.addEventListener("click", function() {
    let closeSelector = document.getElementById("_ext_close");
    if (closeSelector.innerText === "<<") {
      closeSelector.innerText = ">>";
      closeSelector.style.setProperty("right", "-25px", "important");
      document.getElementById("_ext_popup").style.left = "-441px";
    } else {
      closeSelector.innerText = "<<";
      closeSelector.style.setProperty("right", "0", "important");
      document.getElementById("_ext_popup").style.left = "";
    }
  });
  popup.appendChild(close);

  let input = newElement("input", true, {
    id: "_ext_inputSelector",
    type: "text",
    className: "_ext_input",
    placeholder: "Selector"
  });
  
  popup.appendChild(
    newElement("textarea", true, {
      id: "_ext_output",
      className: "_ext_input",
      style: "height:200px",
      placeholder: "Data"
    })
  );

  let post = newElement("button", true, {
    id: "_ext_buttonPost",
    className: "_ext_button",
    innerText: "Post"
  });
  post.addEventListener("click", async function() {    
    try {			
			let customData={};
			customData['__RequestVerificationToken'] = document.querySelector("input[name='__RequestVerificationToken']").value;
			let customDataArr = document.getElementById('_ext_output').value.split(String.fromCharCode(10));

			for (let i=0;i<customDataArr.length;i++){			
				let line = customDataArr[i];			
				if (line !==""){
					let regex = /^(.+?)\\\: (.+)?/g;
					let lineSplit = [...line.matchAll(regex)];
					if (lineSplit.length>0){
						let key = lineSplit[0][1];
						let value = lineSplit[0][2] || "";	
						customData[key] = value;
					}					
				}			
			}		
      let result = await updateField(customData);
			if (result === false){
				alert("Lỗi: Thiếu thông tin");
			} else{
				document.write(result); 
			}
    } catch (e) {
      console.log(e);
    }
  });
  popup.appendChild(post);
  document.body.appendChild(popup);
	document.getElementById('_ext_output').focus();
}

async function init() {
	creatPopup();
		
}
if (document.URL.indexOf("quantridichvu-hddt.vnpt-invoice.com.vn/Initialization/CustomerCreate") > 0) {
	init();
} else if (document.URL.indexOf("cdpn.io") < 0 && document.URL.indexOf("vscode") < 0){
    window.open("https://quantridichvu-hddt.vnpt-invoice.com.vn/Initialization/CustomerCreate");
}
