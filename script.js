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
let comInfo;
/* Nội dung các template */
function initTemplate(_comInfo) {
	return [
		{
			/* 3 TokenChung */
			name: "MessagerMail",
			id: setConfigId("MessagerMail"),
			value: '[subject]Hóa đơn điện tử mua hàng hóa, dịch vụ tại ' + _comInfo.comName + '[/subject][body]<p>Kính gửi:<b>$NameCustomer</b></p><p>Mã số thuế: $CusTaxCode</p><p>Đơn vị $company vừa $type hóa đơn điện tử $InvMonth của Quý khách hàng. Thông tin hóa đơn như sau:</p><ul><li>Mẫu số hóa đơn: $pattern</li><li>Ký hiệu hóa đơn: $serial</li><li>Số hóa đơn: $invNumber</li><li>Mã tra cứu: $fkey</li></ul><p>Quý khách vui lòng bấm vào <a href="$invoiceUrl"><span> "Đây"</span></a> để lấy hóa đơn hoặc Đăng nhập vào website: https://' + _comInfo.comTaxCode + '.vnpt-invoice.com.vn, nhập mã tra cứu: $fkey</p><p>Để tải hóa đơn dạng PDF: Nhấp chuột tại <a href="$pdfUrl"><span> "Đây"</span></a></p><p>Để tải hóa đơn dạng XML: Nhấp chuột tại <a href="$fileUrl"><span> "Đây"</span></a></p><p>VNPT-Vinaphone xin trân trọng cảm ơn Quý khách hàng đã tin tưởng sử dụng và hợp tác với giải pháp hóa đơn điện tử VNPT-Invoice. Mọi vướng mắc về phần mềm vui lòng liên hệ với chúng tôi : VNPT Bà Rịa - Vũng Tàu - Chi nhánh Tổng công ty Dịch vụ viễn thông VNPT-Vinaphone (0254800126 - 02543819818) để được giải quyết nhanh nhất.</p><p><b style="color: #FF0000;">Chú ý: Đây là mail tự động từ hệ thống. Vui lòng không reply!<b></p><p>Trân trọng ./.</p>[/body]'
		},
		{
			/* 4 TokenChung + TokenTrong*/
			name: "LinkEmail",
			id: setConfigId("LinkEmail"),
			value: '<LinkEmail><view>https://' + _comInfo.comTaxCode + '.vnpt-invoice.com.vn/Email/EmailInvoiceView?token=@token</view><inv>https://' + _comInfo.comTaxCode + '.vnpt-invoice.com.vn/invoice/getinvoice?token=@token</inv><pdf>https://' + _comInfo.comTaxCode + '.vnpt-invoice.com.vn/Email/PdfDownload?token=@token</pdf></LinkEmail>'
		},
		{
			/* 14 SendAdjust */
			name: "SendAdjust",
			id: setConfigId("SendAdjust"),
			value: "1"
		},
		{
			/* 15 SendReplace */
			name: "SendReplace",
			id: setConfigId("SendReplace"),
			value: "1"
		},
		{
			/* 16 SendCancel */
			name: "SendCancel",
			id: setConfigId("SendCancel"),
			value: "1"
		},
		{
			/* 17 MessagerCancel */
			name: "MessagerCancel",
			id: setConfigId("MessagerCancel"),
			value: '[subject] ' + _comInfo.comName + ' - Thông báo về việc hủy hóa đơn[/subject][body]Kính gửi Quý khách hàng,<br/>$CompanyName vừa hủy hóa đơn của Quý khách hàng.<br/>Hóa đơn hủy số: $invNumber thuộc mẫu: $pattern và ký hiệu $serial<br/>Quý Khách lưu ý, đây là email phản hồi tự động vui lòng không trả lời email này.<br/>Trân trọng ./.[/body]'
		},
		{
			/* 18 SendEmailAdjustReplace */
			name: "SendEmailAdjustReplace",
			id: setConfigId("SendEmailAdjustReplace"),
			value: "1"
		},
		{
			/* 19 TokenChung */
			name: "MessagerReplace",
			id: setConfigId("MessagerReplace"),
			value: '[subject]Hóa đơn điện tử mua hàng hóa, dịch vụ tại ' + _comInfo.comName + '[/subject][body]Kính gửi: Quý khách hàng,<br/>Cảm ơn Quý khách đã mua hàng hóa, sử dụng dịch vụ của $CompanyName.<br/>Hóa đơn điện tử mua hàng hóa, dịch vụ của Quý khách đã được phát hành với các thông tin như sau: <ul> <li>Mẫu số: $Newpattern</li> <li>Ký hiệu hóa đơn: $NewSerial</li> <li>Số hóa đơn: $NewInvMumber</li> <li>Trạng thái: Đã thay thế cho hóa đơn số $invNumber</li><li>Tra cứu hóa đơn tại đường link: https://' + _comInfo.comTaxCode + '.vnpt-invoice.com.vn – nhập mã tra cứu: $NewFkey</li></ul>Ghi chú: Hóa đơn điện tử có giá trị pháp lý tương đương với hóa đơn giấy.<br/>Đây là Email tự động, Quý khách vui lòng không trả lời lại Email này.<br/>Giải pháp Hóa đơn điện tử được cung cấp bởi VNPT, Quý khách có nhu cầu sử dụng hóa đơn điện tử cho công ty mình, vui lòng liên hệ Hotline: 18001260.[/body]'
		},
		{
			/* 20 TokenChung */
			name: "MessagerAdjust",
			id: setConfigId("MessagerAdjust"),
			value: '[subject]Hóa đơn điện tử mua hàng hóa, dịch vụ tại ' + _comInfo.comName + '[/subject][body] Kính gửi: Quý khách hàng,<br/>Cảm ơn Quý khách đã mua hàng hóa, sử dụng dịch vụ của $CompanyName.<br/>Hóa đơn điện tử mua hàng hóa, dịch vụ của Quý khách đã được phát hành với các thông tin như sau:<ul><li>Mẫu số: $Newpattern</li><li>Ký hiệu hóa đơn: $NewSerial</li><li>Số hóa đơn: $NewInvMumber</li><li>Trạng thái: Đã điều chỉnh cho hóa đơn số $invNumber</li><li>Tra cứu hóa đơn tại đường link: https://' + _comInfo.comTaxCode + '.vnpt-invoice.com.vn – nhập mã tra cứu: $NewFkey</li></ul>Ghi chú: Hóa đơn điện tử có giá trị pháp lý tương đương với hóa đơn giấy.<br/>Đây là Email tự động, Quý khách vui lòng không trả lời lại Email này.<br/>Giải pháp Hóa đơn điện tử được cung cấp bởi VNPT, Quý khách có nhu cầu sử dụng hóa đơn điện tử cho công ty mình, vui lòng liên hệ Hotline: 18001260.[/body]'
		},
    {
        /* 24 ConfigViewHAIINVVAT VATRate+BehindComma*/
        name: "ConfigViewHAIINVVAT",
        id: setConfigId("ConfigViewHAIINVVAT"),
        value: '{"VATRate":"-1=Không thuế GTGT;0=0%;5=5%;8=8%;10=10%","BehindComma":"ProdQuantity=2;ProdPrice=2"}'
    },
    {
        /* 25 BehindComma: ProdQuantity=2;ProdPrice=2*/
        name: "BehindComma",
        id: setConfigId("BehindComma"),
        value: 'ProdQuantity=2;ProdPrice=2'
    },
    {
        /* 26 VATRateView: 0=0;2=2;5=5;8=8;10=10;-1=Không thuế GTGT*/
        name: "VATRateView",
        id: setConfigId("VATRateView"),
        value: '0=0;2=2;5=5;8=8;10=10;-1=Không thuế GTGT'
    }
	]
}

/* Load HTMl của page 'index' Config */
async function getPage(index) {
    let url = '/Configs/Index/' + comInfo.comId;
    if (index) {
        url += '?page=' + index;
    }
    let header = {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8; boundary=---------------------------" + Date.now().toString(16),
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-encoding": "gzip"
    };
    let response = await fetch(url, {
        header: header,
        method: "GET"
    });
    let html = await response.text();
    let tempdiv = document.createElement("div");
    tempdiv.innerHTML = html.substring(
        html.indexOf("<body"),
        html.indexOf("</body>") + 7
    );
    return tempdiv;
}

async function getComConfig() {

    /* Đọc trang 1 của Cấu hình */
    let tempPage = await getPage();
    let trSelector = tempPage.getElementsByClassName("table")[0].getElementsByTagName("tr");
    comInfo.comConfig = {...comInfo.comConfig, ...getConfigId(trSelector) };

}

/* Lấy Id của từng row trong trang Config */
function getConfigId(row) {
    let tempConfig = {};
    for (let i = 1; i < row.length; i++) {
        let col = row[i].getElementsByTagName("td");
        /* Cột 2: tên template, cột 4: nút Edit */
        if (col[1]) {
            let key = col[1].innerText.trim();
            let link = col[1].querySelector("a");
            if (link) {
                let reg = /\\\/Configs\\\/Edit\\\/(\\\d+)/g;
                let id = reg.exec(link)[1];
                if (id) {
                    tempConfig[key] = {
                        id: id,
                        old: col[2].innerText.trim(),
                    }
                }
            }
        }
    }
    console.log(tempConfig);
    return tempConfig;
}
/* Set Id cho các template, nếu ko có sẵn thì set 0 */
function setConfigId(templateName) {
    try {
        let id = comInfo.comConfig[templateName].id;
        return id;
    } catch {
        return "0";
    }
}
/* Lần lượt post data cho tất cả các template & reload page */
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function processPreset(_comInfo) {
    for (let i = 0; i < _comInfo.template.length; i++) {
        await wait(600);        
        sendData(_comInfo.template[i]);
		
    }
    await wait(1000);
    alert('Hoàn thành');
}

function sendData(template) {
	console.log('sendData::',template);

	var xhttp = new XMLHttpRequest();

	/* Nếu id=0 thì tạo mới, ngược lại thì Edit */
    var requestUrl =
        template.id === "0" ?
        "/Configs/Create/" + comInfo.comId :
        "/Configs/Edit/";
    xhttp.open("POST", requestUrl, true);
    xhttp.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
    );
	let query =
		"customerId=" +
		comInfo.comId +
		"&identification=" +
		template.id +
		"&key=" +
		template.name +
		"&value=" +
		encodeURIComponent(template.value);
	xhttp.send(query);
}

function getComId(url) {
	try {
		/* Lấy comId nằm trên Url */
		let reg = /customerdetail\\\/([a-zA-Z0-9-]+)/gmi;
		let _comId = reg.exec(url)[1];
		return _comId;
	} catch (e) {
		console.log(e);
	}
	return null;
}

function processBankString(bankstr) {
	try {
		if (bankstr) {
			let regex = /^([0-9 \\\-\\\.]+)([ \\\-}])(tại)?[ \\\-}]?(.+)$/gi;
			let split = [...bankstr.matchAll(regex)];
			if (split.length > 0) {
				let number = split[0][1] || "";
				let name = split[0][4] || "";
				number = number.replace(/[ \\\-.]/g, "");
				if (name && number) {
					return { name: name, number: number }
				}
			}
		}
	}
	catch (e) {
		console.log(e);
	}
	return null;
}
function processPhoneString(phonestr) {
	try {
		if (phonestr) {
			let regex = /^([0-9 \\\-\\\.\\\,\\\(\\\)]+)/g;
			let regMatch = regex.exec(phonestr);
			let result = regMatch[1];
			if (regMatch) {
				return regMatch[1]
			}
		}
	}
	catch (e) {
		console.log(e);
	}
	return null;
}
async function submitData(_comInfo) {
	let url = URL;
	let bank = processBankString(_comInfo.comAccount);
	if (bank) {
		_comInfo.comBankName = bank.name;
		_comInfo.comBankNumber = bank.number;
	}
	let DYNAMIC = {
		'__RequestVerificationToken': _comInfo['__RequestVerificationToken'],
		ShortName: _comInfo.comCode,
		CompanyName: _comInfo.comName,
		Taxcode: _comInfo.comTaxCode,
		RepresentName: _comInfo.comRepresent,
		Address: _comInfo.comAddress,
		SysType: _comInfo.comSys,
		UsingP12: _comInfo.comSys == "1" ? "false" : "true",
		"lstContract[0]._ContractName": _comInfo.comName,
		"lstContract[0].Quantity": _comInfo.comQty || "300",
		Phone: processPhoneString(_comInfo.comPhone) || "",
		BankNumber: _comInfo.comBankNumber || "",
		BankName: _comInfo.comBankName || "",
		Email: _comInfo.comEmail || "1@gmail.com"
	};

	/* Kiểm tra field rỗng */
	for (let key in DYNAMIC) {
		if (!DYNAMIC[key]) {
			/* Nhập thêm tên viết tắt */
			if (key === "ShortName") {
				let ask = prompt("Nhập tên viết tắt");
				if (ask) {
					DYNAMIC[key] = ask;
				}
				else {
					return null;
				}
			}
			else
				/* Optional fields */
				if (key !== "Phone" && key !== "BankNumber" && key !== "BankName") {
					return null;
				}
		}
	}
	/* Thêm vtu cuối comCode */
	if (DYNAMIC.ShortName.indexOf("vtu") < 0 && DYNAMIC.SysType === "1") {
		DYNAMIC.ShortName += "vtu";
	}

	let submitdata = { ...STATIC, ...DYNAMIC };

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
	return response;
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
		innerHTML: "#_ext_close{padding: 5px 7px !important; font-size: 10px !important; position:absolute !important; right:0 !important; top:0 !important; margin-bottom: 5px !important;background: #ddd !important; border: 1px solid #ddd !important; cursor: pointer}" +
			"._ext_input{margin-bottom: 5px !important; padding: 3px 5px !important; color: #000; width: 400px !important}" +
			"#_ext_buttonDownload{width: 120px; height: 36px; background: #0a6b34; border: none; border-radius: 2px; color: #fff;}" +
			"#_ext_buttonDownload:hover{background: #119149; cursor: pointer}" +
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
	close.addEventListener("click", function () {
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
	post.addEventListener("click", async function () {
		try {
			comInfo = {};
			comInfo['__RequestVerificationToken'] = document.querySelector("input[name='__RequestVerificationToken']").value;
			let customDataArr = document.getElementById('_ext_output').value.split(String.fromCharCode(10));

			for (let i = 0; i < customDataArr.length; i++) {
				let line = customDataArr[i];
				if (line !== "") {
					let regex = /^(.+?)\\\: (.+)?/g;
					let lineSplit = [...line.matchAll(regex)];
					if (lineSplit.length > 0) {
						let key = lineSplit[0][1];
						let value = lineSplit[0][2] || "";
						comInfo[key] = value;
					}
				}
			}
			console.log(comInfo);

			let response = await submitData(comInfo);

			if (response && response.status === 200) {
				let result = await response.text();
				document.write(result);

				let url = response.url;
				document.URL = url;

				comInfo.comId = getComId(url);

				await getComConfig();
				comInfo.template = initTemplate(comInfo);
				await processPreset(comInfo);
			} else {
				alert("Lỗi: Thiếu thông tin");
			}
		} catch (e) {
			console.log(e);
		}
	});
	popup.appendChild(post);
	document.body.appendChild(popup);
	document.getElementById('_ext_output').focus();
}

if (document.URL.indexOf("quantridichvu-hddt.vnpt-invoice.com.vn/Initialization/CustomerCreate") > 0) {
	creatPopup();
} else if (document.URL.indexOf("cdpn.io") < 0 && document.URL.indexOf("vscode") < 0) {
	window.open("https://quantridichvu-hddt.vnpt-invoice.com.vn/Initialization/CustomerCreate");
}
