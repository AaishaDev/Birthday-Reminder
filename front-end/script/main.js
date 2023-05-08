const bodySection = document.querySelector("#section");

const tokenVerify = async () => {
  const expiryTime = localStorage.getItem("accessTokenExpire");
  const refreshToken = localStorage.getItem("refreshToken");

  if (new Date().getTime() > expiryTime) {
    const res = await fetch("https://birthday-reminder-shdw.onrender.com/refresh", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const { accessToken } = await res.json();

    localStorage.setItem("accessToken", accessToken);
    const expiresIn = 15 * 60; // 15 minutes in seconds
    const expiryTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("accessTokenExpire", expiryTime);
  }
};

const otpVerify = async () => {
  const otp = document.querySelector("#otp");
  await tokenVerify();

  let token = localStorage.getItem("accessToken");

  if (!otp.value) {
    alert("Please enter OTP!!");
    return;
  }
  const otpVal = otp.value;
  const res = await fetch("https://birthday-reminder-shdw.onrender.com/otpVerify", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ otpVal }),
  });

  const data = await res.json();
  location.reload();
};
const getBdays = async () => {
  const reminderSection = document.getElementById("reminderSection");
  const rightSection = document.getElementById("right");

  let token = localStorage.getItem("accessToken");
  const res = await fetch("https://birthday-reminder-shdw.onrender.com/reminder/getBdays", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.status === 200 && data.length !== 0) {
    const stringHTML = `
<div class="right" id="right">
<p>Added Reminders</p>
<div class="bdays" id="bdays">
 
</div>
</div>`;
    const fragment = document
      .createRange()
      .createContextualFragment(stringHTML);

    if (reminderSection.childElementCount < 2) {
      reminderSection.appendChild(fragment);
    }

    bdayList();
  } else {
    if (rightSection) {
      reminderSection.removeChild(rightSection);
    }
  }
};

const bdayList = async () => {
  const bdaySection = document.getElementById("bdays");
  let token = localStorage.getItem("accessToken");
  const res = await fetch("https://birthday-reminder-shdw.onrender.com/reminder/getBdays", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (data.length !== 0 && res.status === 200) {
    bdaySection.innerHTML = `
  ${data
    .map((elem) => {
      return `
      <div class="bday">
        <div>
          <p class="name">${elem.name}</p>
          <div class="divider">|</div>
          <p class="date">${elem.bday.split("-")[0]}, ${
        elem.bday.split("-")[1] === "1"
          ? "January"
          : elem.bday.split("-")[1] === "2"
          ? "February"
          : elem.bday.split("-")[1] === "3"
          ? "March"
          : elem.bday.split("-")[1] === "4"
          ? "April"
          : elem.bday.split("-")[1] === "5"
          ? "May"
          : elem.bday.split("-")[1] === "6"
          ? "June"
          : elem.bday.split("-")[1] === "7"
          ? "July"
          : elem.bday.split("-")[1] === "8"
          ? "August"
          : elem.bday.split("-")[1] === "9"
          ? "September"
          : elem.bday.split("-")[1] === "10"
          ? "October"
          : elem.bday.split("-")[1] === "11"
          ? "November"
          : elem.bday.split("-")[1] === "12"
          ? "December"
          : "Invalid month"
      }
</p>
        </div>
        <div>
         
          <div class="delete" onclick="deleteBday('${elem._id}')">
            <span class="material-symbols-rounded">
              delete
            </span>
          </div>
        </div>
      </div>
    `;
    })
    .join("")}
  `;
  } else {
    bdaySection.innerHTML = "";

    getBdays();
  }
};
const onload = async () => {
  const loading = document.getElementsByClassName("loding")[0];
  loading.style.display = "flex";
  let refreshtoken = localStorage.getItem("refreshToken");
  if (!refreshtoken) window.location.href = "./index.html";
  await tokenVerify();

  let token = localStorage.getItem("accessToken");

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) window.location.href = "./index.html";

  const res = await fetch("https://birthday-reminder-shdw.onrender.com/isEmailVerified", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    bodySection.innerHTML = `
    <div id="reminderSection" class="add-reminder">
  <div class="left">
    <p>Set Reminders</p>
    <div class="rem-fields">
      <input id="friendName" type="text" placeholder="Enter Name">
      <div class="select-elem">
        <select id="day">
          <option value="">Select Day</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        

       <select name="" id="month">
        <option value="" >Select Month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
       </select>
      </div>
      <button onclick="addReminder(event)">Add Reminder</button>
    </div>

  </div>
  
</div>
`;
  } else {
    bodySection.innerHTML = `
    <div class="main-section">
        <div class="left">
          <p>Verify your email!</p>
          <p>
            We have sent you an email containing <br />
            a OTP. Please enter that OTP
          </p>
          <div>
            <input id="otp" type="text" placeholder="OTP" />
            <button id="enterOtp" onclick="otpVerify(event)">Ok</button>
          </div>
        </div>
        <div class="right">
          <img src="./images/cake.png" alt="" />
        </div>
      </div>
    `;
  }

  await getBdays();
  loading.style.display = "none";
};
onload();

const deleteBday = async (id) => {
  await tokenVerify();
  let token = localStorage.getItem("accessToken");
  const res = await fetch(`https://birthday-reminder-shdw.onrender.com/reminder/deleteBday/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  await bdayList();
};

const logoutBtnClicked = async () => {
  await tokenVerify();
  let token = localStorage.getItem("accessToken");
  const res = await fetch("https://birthday-reminder-shdw.onrender.com/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 204) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpire");
    window.location.href = "./index.html";
  }
};

const addReminder = async (event) => {
  await tokenVerify();
  let token = localStorage.getItem("accessToken");
  const friend = document.querySelector("#friendName");
  const day = document.querySelector("select#day");
  const month = document.querySelector("select#month");

  if (!friend.value || !day || !month) {
    alert("Please fill all fields");
    return;
  }
  event.target.innerHTML = `<span class="loading material-symbols-rounded">
      cycle
      </span>`;
  const res = await fetch("https://birthday-reminder-shdw.onrender.com/reminder/addReminder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      friend: friend.value,
      bday: `${day.value}-${month.value}`,
    }),
  });

  const data = await res.json();

  event.target.innerHTML = `Add Reminder`;
  getBdays();
  friend.value = "";
  day.value = "";
  month.value = "";
};
