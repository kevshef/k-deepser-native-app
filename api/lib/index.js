import fetch from "node-fetch";
import DeepAPI from "./src/class/DeepAPI";


/**
 * Sets node-fetch method as global fetch method
 */
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
};



DeepAPI.getInstance()
    .setHost('https://deepdeskhost')
    .setToken('token');


(async function apiCallAsync(){
    /**
     * Write you code here
     */
    let user = (new User()).getCollection();
    await user.load();
    console.log(user);
})();






