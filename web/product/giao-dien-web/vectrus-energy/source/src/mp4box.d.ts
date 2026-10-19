declare module 'mp4box' {
  export interface MP4ArrayBuffer extends ArrayBuffer {
    fileStart: number;
  }

  export interface MP4VideoTrack {
    id: number;
    codec: string;
    duration: number;
    timescale: number;
    nb_samples: number;
    video?: {
      width: number;
      height: number;
    };
  }

  export interface MP4Info {
    duration: number;
    timescale: number;
    videoTracks: MP4VideoTrack[];
  }

  export interface MP4Sample {
    number: number;
    track_id: number;
    data: Uint8Array;
    size: number;
    cts: number;
    dts: number;
    duration: number;
    is_sync: boolean;
    timescale: number;
  }

  export class DataStream {
    static BIG_ENDIAN: boolean;
    static LITTLE_ENDIAN: boolean;
    buffer: ArrayBuffer;
    position: number;
    constructor(buffer?: ArrayBuffer, byteOffset?: number, endianness?: boolean);
  }

  export interface MP4BoxEntry {
    avcC?: { write(stream: DataStream): void };
    hvcC?: { write(stream: DataStream): void };
    vpcC?: { write(stream: DataStream): void };
    av1C?: { write(stream: DataStream): void };
  }

  export interface MP4Trak {
    mdia?: {
      minf?: {
        stbl?: {
          stsd?: {
            entries: MP4BoxEntry[];
          };
        };
      };
    };
  }

  export interface ISOFile {
    onReady?: (info: MP4Info) => void;
    onError?: (e: string) => void;
    onSamples?: (id: number, user: unknown, samples: MP4Sample[]) => void;
    appendBuffer(data: MP4ArrayBuffer): number;
    flush(): void;
    setExtractionOptions(id: number, user?: unknown, options?: { nbSamples?: number }): void;
    start(): void;
    stop(): void;
    getTrackById(id: number): MP4Trak | null;
  }

  export function createFile(): ISOFile;
}
