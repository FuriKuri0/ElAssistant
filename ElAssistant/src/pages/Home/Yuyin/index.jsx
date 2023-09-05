import  { useRef, useState ,useEffect} from 'react'
import './index.scss'
import {AudioOutlined,AudioMutedOutlined} from '@ant-design/icons';
import {toBase64,getWebSocketUrl} from '../../../utils/index'
const recorder = new window.RecorderManager('/lib/');
let iatWS;
let resultText = "";
let resultTextTemp = "";
var APPID = "065317c5";
export default function Yuyin() {
  const peopleInput = useRef()
  const [recording,setRecording] = useState(false)
  const handleSwitch = () => { // 文本语音切换
    recording? stopRecord():startRecord()
    setRecording(!recording)
  }
    //流式识别 处理结果
    function renderResult(resultData) {
      // 识别结束
      let jsonData = JSON.parse(resultData);
      if (jsonData.data && jsonData.data.result) {
        let data = jsonData.data.result;
        let str = "";
        let ws = data.ws;
        for (let i = 0; i < ws.length; i++) {
          str = str + ws[i].cw[0].w;
        }
        // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
        // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
        if (data.pgs) {
          if (data.pgs === "apd") {
            // 将resultTextTemp同步给resultText
            resultText = resultTextTemp;
          }
          // 将结果存储在resultTextTemp中
          resultTextTemp = resultText + str;
        } else {
          resultText = resultText + str;
        }
        peopleInput.current.value =
          resultTextTemp || resultText || "";
      }
      if (jsonData.code === 0 && jsonData.data.status === 2) {
          resultTextTemp=''
          resultText=''
          stopRecord()
        iatWS.close();
      }
      if (jsonData.code !== 0) {
          resultTextTemp=''
          resultText=''
          stopRecord()
        iatWS.close();
        console.error(jsonData);
      }
    }
    //流式识别 连接创建
    function connectWebSocket() {
      const websocketUrl = getWebSocketUrl();
        iatWS = new WebSocket(websocketUrl);
      iatWS.onopen = (e) => {
          console.log('开始录音')
      setRecording(true);
        // 开始录音
        recorder.start({
          sampleRate: 16000,
          frameSize: 1280,
        });
        var params = {
          common: {
            app_id: APPID,
          },
          business: {
            language: "zh_cn",
            domain: "iat",
            accent: "mandarin",
            vad_eos: 5000,
            dwa: "wpgs",
          },
          data: {
            status: 0,
            format: "audio/L16;rate=16000",
            encoding: "raw",
          },
        };
        iatWS.send(JSON.stringify(params));
      };
      iatWS.onmessage = (e) => {
        renderResult(e.data);
      };
      iatWS.onerror = (e) => {
        console.error(e);
        recorder.stop();
      };
      iatWS.onclose = (e) => {
        recorder.stop();
      };
    }
  //监听麦克风
    recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
      if (iatWS.readyState === iatWS.OPEN) {
        iatWS.send(
          JSON.stringify({
            data: {
              status: isLastFrame ? 2 : 1,
              format: "audio/L16;rate=16000",
              encoding: "raw",
              audio: toBase64(frameBuffer),
            },
          })
        );
        if (isLastFrame) {
          stopRecord()
        }
      }
    };
    //开始监听
  const startRecord = () => { // 语音输入开始
      connectWebSocket()
  }
//停止监听
  const stopRecord = () => { // 语音输入结束
      setRecording(false);
      recorder.stop()
  }
  return (
    <div className='Yuyin'>
      <div className='WordInput'>
        <div className="switch" style={{color:`${!recording ?'gray':'red'}`}} onClick={handleSwitch}>
            {
                !recording ?<><AudioOutlined  className='icon'/> </>  :<><AudioMutedOutlined  className='icon'/></> 
            }       
        </div>
        <div className="input"><textarea type="text" name="wordInput" id="wordInput"   placeholder='请输入' ref={peopleInput} /></div>
        {/* <div className="send" onClick={send}>
            <RocketOutlined className='icon'   />
        </div> */}
          </div>
    </div>
  )
}
