import hasInvaded from "@/constants/hasInvaded";

export async function hasChinaInvadedTaiwan() : Promise<boolean> {
    const hasChinaInvadedTaiwan = await hasInvaded();
    return hasChinaInvadedTaiwan;
}