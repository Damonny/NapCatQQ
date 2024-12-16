import { OB11EmitEventContent, OB11NetworkReloadType } from './index';
import { NapCatOneBot11Adapter, OB11Message } from '@/onebot';
import { NapCatCore } from '@/core';
import { PluginConfig } from '../config/config';
import { plugin_onmessage } from '@/plugin';
import { ActionMap } from '../action';
import { IOB11NetworkAdapter } from "@/onebot/network/adapter";

export class OB11PluginAdapter extends IOB11NetworkAdapter<PluginConfig> {
    constructor(
        name: string, config: PluginConfig, core: NapCatCore, obContext: NapCatOneBot11Adapter, actions: ActionMap
    ) {
        super(name, config, core, obContext, actions);
    }

    onEvent<T extends OB11EmitEventContent>(event: T) {
        if (event.post_type === 'message') {
            plugin_onmessage(this.config.name, this.core, this.obContext, event as OB11Message,this.actions).then().catch();
        }
    }

    open() {

    }

    async close() {

    }

    async reload() {
        return OB11NetworkReloadType.Normal;
    }
}
