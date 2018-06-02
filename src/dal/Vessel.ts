import { InjectorService, JsonProperty } from 'ts-express-decorators';
import { prop, Typegoose, InstanceType, arrayProp, instanceMethod, pre, ModelType } from 'typegoose';
import * as bcrypt from 'bcrypt-nodejs';
import { UserRepositoryToken } from './token-constants';

export class MostRecentVoyage extends Typegoose {
    @prop()
    @JsonProperty()
    eta: string;

    @prop()
    @JsonProperty()
    destination: string;
}

export class LastKnownPosition extends Typegoose {
    @prop()
    @JsonProperty()
    timestamp: Date;

    @prop()
    @JsonProperty()
    geometry: geometry;

    @prop()
    @JsonProperty()
    heading: int;

    @prop()
    @JsonProperty()
    speed: number;

    @prop()
    @JsonProperty()
    rot: int;

    @prop()
    @JsonProperty()
    accuracy: Int16Array;

    @prop()
    @JsonProperty()
    collection_type: string;

    @prop()
    @JsonProperty()
    draught: number;

    @prop()
    @JsonProperty()
    maneuver: int;

    @prop()
    @JsonProperty()
    course: number;
}

export class geometry extends Typegoose {
    @prop()
    @JsonProperty()
    type: string;

    @prop()
    @JsonProperty()
    coordinates: geometry;
}

export class Vessel extends Typegoose {

    // Unique identifier of the vessel in the Spire database.
    @prop({ unique: true })
    @JsonProperty()
    id: string;

    @prop()
    @JsonProperty()
    name: string;

    @prop()
    @JsonProperty()
    mmsi: int;

    @prop()
    @JsonProperty()
    imo: int;

    @prop()
    @JsonProperty()
    call_sign: string;
    
    @prop()
    @JsonProperty()
    flag: string;

    @prop()
    @JsonProperty()
    length: number;

    @prop()
    @JsonProperty()
    width: number;

    @prop()
    @JsonProperty()
    ais_version: int;

    @prop()
    @JsonProperty()
    create_at: Date;

    @prop()
    @JsonProperty()
    updated_at: Date;

    @prop()
    @JsonProperty()
    general_classification: string;

    @prop()
    @JsonProperty()
    individual_classification: string;

    @prop()
    @JsonProperty()
    gross_tonnage: string;

    @prop()
    @JsonProperty()
    lifeboats: int;

    @prop()
    @JsonProperty()
    person_capacity: int;

    @prop()
    @JsonProperty()
    navigational_status: int;

    @prop()
    @JsonProperty()
    most_recent_voyage: MostRecentVoyage;

    @prop()
    @JsonProperty()
    last_known_position: LastKnownPosition;
}

export type VesselInstance = InstanceType<Vessel>;
export type VesselRepository = ModelType<Vessel>;
