/// <reference types="vite/client" />

import { BackendImplementable } from "./services/facade";

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_BACK_END: string;
    readonly VITE_APP_BACK_END_CLASS: BackendImplementable;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}