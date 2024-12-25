import HTTPTools from "./utils/HTTPTools";

const r = HTTPTools.get("http://localhost:80/api/player/get?id=5364085071")
r.then((res) => {
    console.log(res.data)
})