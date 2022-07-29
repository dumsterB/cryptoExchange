import { wrappedAsyncFunction } from "@/utils/wrappedFunction";
import { getAssetInfo } from "../api/repositories/asset";

async function load(id) {
    const asset = await getAssetInfo(id);

    return asset;
}

export const loadAsset = wrappedAsyncFunction(load);