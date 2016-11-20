import { AnimationPlayer } from '../private_import_core';
import { DomAnimatePlayer } from './dom_animate_player';
export declare class WebAnimationsPlayer implements AnimationPlayer {
    element: any;
    keyframes: {
        [key: string]: string | number;
    }[];
    options: {
        [key: string]: string | number;
    };
    private _onDoneFns;
    private _onStartFns;
    private _player;
    private _duration;
    private _initialized;
    private _finished;
    private _started;
    private _destroyed;
    parentPlayer: AnimationPlayer;
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], options: {
        [key: string]: string | number;
    });
    private _onFinish();
    init(): void;
    domPlayer: DomAnimatePlayer;
    onStart(fn: () => void): void;
    onDone(fn: () => void): void;
    play(): void;
    pause(): void;
    finish(): void;
    reset(): void;
    private _resetDomPlayerState();
    restart(): void;
    hasStarted(): boolean;
    destroy(): void;
    totalTime: number;
    setPosition(p: number): void;
    getPosition(): number;
}
