/** Simple copy of client.ts. Modified to be consumed by ts-to-zod. This is manual, not auto currently.
 * 
 * Replace any nested classes with their interface. 
 * Remove any duplicates of the nested type fields exposed as first-level properties.
 * 
 */

/* eslint-disable */
// ReSharper disable InconsistentNaming

export class AdditionalTask implements IAdditionalTask {
    businessLine!: BusinessLine;
    organization!: string;
    taskDescription!: string;
    projectRequestId!: number;

    constructor(data?: IAdditionalTask) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.businessLine = _data["businessLine"];
            this.organization = _data["organization"];
            this.taskDescription = _data["taskDescription"];
            this.projectRequestId = _data["projectRequestId"];
        }
    }

    static fromJS(data: any): AdditionalTask {
        data = typeof data === 'object' ? data : {};
        let result = new AdditionalTask();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["businessLine"] = this.businessLine;
        data["organization"] = this.organization;
        data["taskDescription"] = this.taskDescription;
        data["projectRequestId"] = this.projectRequestId;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IAdditionalTask {
    businessLine: BusinessLine;
    organization: string;
    taskDescription: string;
    projectRequestId: number;
}

export class StageData implements IStageData {
    stage?: StageKind;

    constructor(data?: IStageData) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.stage = _data["stage"];
        }
    }

    static fromJS(data: any): StageData {
        data = typeof data === 'object' ? data : {};
        let result = new StageData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["stage"] = this.stage;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IStageData {
    stage?: StageKind;
}

export class StageDataPursuit extends StageData implements IStageDataPursuit {
    federalProject!: boolean;

    constructor(data?: IStageDataPursuit) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.federalProject = _data["federalProject"];
        }
    }

    static override fromJS(data: any): StageDataPursuit {
        data = typeof data === 'object' ? data : {};
        let result = new StageDataPursuit();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["federalProject"] = this.federalProject;
        super.toJSON(data);
        return data;
    }
}
/**
 * @toExtract
 */
export interface IStageDataPursuit extends IStageData {
    federalProject: boolean;
}


/**
 * @toExtract
 */
export interface IAwardedContractRecievedStageData extends IStageDataPursuit {
    midStageData: IStageDataMid;
    fullContractValue: number;
}
/**
 * @toExtract
 */
export type BusinessLine = "Architecture" | "Land" | "Transportation";

export class StageDataFailure extends StageData implements IStageDataFailure {

    constructor(data?: IStageDataFailure) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
    }

    static override fromJS(data: any): StageDataFailure {
        data = typeof data === 'object' ? data : {};
        let result = new StageDataFailure();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        super.toJSON(data);
        return data;
    }
}
/**
 * @toExtract
 */
export interface IStageDataFailure extends IStageData {
}

export class CancelledStageData extends StageDataFailure implements ICancelledStageData {
    cancelledReason?: LostReason;

    constructor(data?: ICancelledStageData) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.cancelledReason = _data["cancelledReason"];
        }
    }

    static override fromJS(data: any): CancelledStageData {
        data = typeof data === 'object' ? data : {};
        let result = new CancelledStageData();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["cancelledReason"] = this.cancelledReason;
        super.toJSON(data);
        return data;
    }
}
/**
 * @toExtract
 */
export interface ICancelledStageData extends IStageDataFailure {
    cancelledReason?: LostReason;
}
/**
 * @toExtract
 */
export type ChargeType = "Regular" | "Promotional";

export class ClientDto implements IClientDto {
    clientId!: string;
    name!: string;

    constructor(data?: IClientDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.clientId = _data["clientId"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): ClientDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["clientId"] = this.clientId;
        data["name"] = this.name;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IClientDto {
    clientId: string;
    name: string;
}
/**
 * @toExtract
 */
export type ContractTypeCategory = "Master" | "Stand Alone" | "Task Order" | "Cost/Fee Proposal" | "Undetermined" | "Historical Data";

export class EmployeeDto implements IEmployeeDto {
    employee!: string;
    titleName!: string;

    constructor(data?: IEmployeeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.employee = _data["employee"];
            this.titleName = _data["titleName"];
        }
    }

    static fromJS(data: any): EmployeeDto {
        data = typeof data === 'object' ? data : {};
        let result = new EmployeeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["employee"] = this.employee;
        data["titleName"] = this.titleName;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IEmployeeDto {
    employee: string;
    titleName: string;
}
/**
 * @toExtract
 */
export type FileType = "Proposal" | "Executed Contract";

export class StageDataPreAward extends StageDataPursuit implements IStageDataPreAward {
    estimatedSolicitationValue!: number;
    estimatedSolicitationNetRevenue!: number;
    expectedRfpDate!: Date;
    captureManager!: string;

    constructor(data?: IStageDataPreAward) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.estimatedSolicitationValue = _data["estimatedSolicitationValue"];
            this.estimatedSolicitationNetRevenue = _data["estimatedSolicitationNetRevenue"];
            this.expectedRfpDate = _data["expectedRfpDate"] ? new Date(_data["expectedRfpDate"].toString()) : undefined as any;
            this.captureManager = _data["captureManager"];
        }
    }

    static override fromJS(data: any): StageDataPreAward {
        data = typeof data === 'object' ? data : {};
        let result = new StageDataPreAward();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["estimatedSolicitationValue"] = this.estimatedSolicitationValue;
        data["estimatedSolicitationNetRevenue"] = this.estimatedSolicitationNetRevenue;
        data["expectedRfpDate"] = this.expectedRfpDate ? this.expectedRfpDate.toISOString() : undefined as any;
        data["captureManager"] = this.captureManager;
        super.toJSON(data);
        return data;
    }
}
/**
 * @toExtract
 */
export interface IStageDataPreAward extends IStageDataPursuit {
    estimatedSolicitationValue: number;
    estimatedSolicitationNetRevenue: number;
    expectedRfpDate: Date;
    captureManager: string;
}


/**
 * @toExtract
 */
export interface IStageDataPreAwardMidStage extends IStageDataPreAward {
    midStageData: IStageDataMid;
    // marketSector?: MarketSector;
    // contractType?: ContractTypeCategory;
    // primaryServiceOffering?: ServiceOffering;
    // billingClient?: string | undefined;
    // projectDeliveryMethod?: ProjectDeliveryMethod;
    // responsibility?: Responsibility;
    // projectType?: ProjectType;
    // principalInCharge?: string | undefined;
    // projectManager?: string | undefined;
    // supervisor?: string | undefined;
    // biller?: string | undefined;
    // addressLine1?: string | undefined;
    // addressLine2?: string | undefined;
    // addressLine3?: string | undefined;
    // city?: string | undefined;
    // state?: State;
    // zipCode?: string | undefined;
    // county?: string | undefined;
    // projectDescriptionScope?: string | undefined;
    // estimatedStartDate?: Date | undefined;
    // estimatedEndDate?: Date | undefined;
}


/**
 * @toExtract
 */
export interface IStageDataPendingPreAwardMidStage extends IStageDataPreAwardMidStage {
    submissionDueDate: Date;
}

/**
 * @toExtract
 */
export interface IStageDataInterviewing extends IStageDataPendingPreAwardMidStage {
    interviewDate?: Date | undefined;
}

/**
 * @toExtract
 */
export interface IInterviewedStageData extends IStageDataInterviewing {
}

/**
 * @toExtract
 */
export interface ILongLeadStageData extends IStageDataPreAward {
}
/**
 * @toExtract
 */
export type LostReason = "Cancelled" | "Changed from Go to No Go" | "Competition" | "Concept" | "Design" | "Distance to Office" | "Incumbent" | "Price" | "Poor Qualification" | "Reputation" | "Schedule";

export class LostStageData extends StageDataFailure implements ILostStageData {
    lostReason?: LostReason;

    constructor(data?: ILostStageData) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.lostReason = _data["lostReason"];
        }
    }

    static override fromJS(data: any): LostStageData {
        data = typeof data === 'object' ? data : {};
        let result = new LostStageData();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["lostReason"] = this.lostReason;
        super.toJSON(data);
        return data;
    }
}
/**
 * @toExtract
 */
export interface ILostStageData extends IStageDataFailure {
    lostReason?: LostReason;
}
/**
 * @toExtract
 */
export type MarketSector = "Aviation" | "Commercial" | "Federal/DOD" | "Healthcare" | "Higher Education" | "Hospitality" | "Industrial" | "Justice" | "K-12" | "Municipalities" | "County" | "State" | "Non Profit" | "Parks & Recreation" | "Public Safety" | "Religious Institutions" | "Residential" | "Transportation" | "Toll/Turnpike" | "Transportation-Federal" | "Water/Sewer Districts" | "Historical Data" | "Individual";

export class NewAdditionalTask implements INewAdditionalTask {
    businessLine!: BusinessLine;
    organization!: string;
    taskDescription!: string;

    constructor(data?: INewAdditionalTask) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.businessLine = _data["businessLine"];
            this.organization = _data["organization"];
            this.taskDescription = _data["taskDescription"];
        }
    }

    static fromJS(data: any): NewAdditionalTask {
        data = typeof data === 'object' ? data : {};
        let result = new NewAdditionalTask();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["businessLine"] = this.businessLine;
        data["organization"] = this.organization;
        data["taskDescription"] = this.taskDescription;
        return data;
    }
}
/**
 * @toExtract
 */
export interface INewAdditionalTask {
    businessLine: BusinessLine;
    organization: string;
    taskDescription: string;
}

/**
 * @toExtract
 */
export interface INewProjectRequest {
    projectName: string;
    organization: string;
    businessLine: BusinessLine;
    requesterEmail: string;
    optionalManualProjectNumber?: string | undefined;
    chargeType: ChargeType;
    primaryClient: string;
    additionalTasks: INewAdditionalTask[];
    stage: StageKind;
    stageData: IStageData;
}

export class NoGoStageData extends StageDataFailure implements INoGoStageData {
    noGoReason?: LostReason;

    constructor(data?: INoGoStageData) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.noGoReason = _data["noGoReason"];
        }
    }

    static override fromJS(data: any): NoGoStageData {
        data = typeof data === 'object' ? data : {};
        let result = new NoGoStageData();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["noGoReason"] = this.noGoReason;
        super.toJSON(data);
        return data;
    }
}
/**
 * @toExtract
 */
export interface INoGoStageData extends IStageDataFailure {
    noGoReason?: LostReason;
}

export class Organization implements IOrganization {
    org!: string;
    name!: string;

    constructor(data?: IOrganization) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.org = _data["org"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): Organization {
        data = typeof data === 'object' ? data : {};
        let result = new Organization();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["org"] = this.org;
        data["name"] = this.name;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IOrganization {
    org: string;
    name: string;
}

export /**
 * @toExtract
 */type ProjectDeliveryMethod = "Design/Bid/Build" | "Design/Build" | "CM@Risk" | "Construction Management" | "Developer Package" | "General Contracting" | "Planning" | "Inspection/Load Ratings" | "Right of Way Acquisition" | "Studies" | "Public-Private Partnership (P3)";

export class ProjectRequestBase implements IProjectRequestBase {
    projectRequestId!: number;
    requestDate!: Date;
    projectRequestStage!: ProjectRequestStage;
    projectName!: string;
    organization!: string;
    businessLine!: BusinessLine;
    requesterEmail!: string;
    optionalManualProjectNumber?: string | undefined;
    chargeType!: ChargeType;
    primaryClient!: string;
    vantagepointWbsn?: string | undefined;
    stage!: StageKind;

    constructor(data?: IProjectRequestBase) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.projectRequestId = _data["projectRequestId"];
            this.requestDate = _data["requestDate"] ? new Date(_data["requestDate"].toString()) : undefined as any;
            this.projectRequestStage = _data["projectRequestStage"];
            this.projectName = _data["projectName"];
            this.organization = _data["organization"];
            this.businessLine = _data["businessLine"];
            this.requesterEmail = _data["requesterEmail"];
            this.optionalManualProjectNumber = _data["optionalManualProjectNumber"];
            this.chargeType = _data["chargeType"];
            this.primaryClient = _data["primaryClient"];
            this.vantagepointWbsn = _data["vantagepointWbsn"];
            this.stage = _data["stage"];
        }
    }

    static fromJS(data: any): ProjectRequestBase {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRequestBase();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["projectRequestId"] = this.projectRequestId;
        data["requestDate"] = this.requestDate ? this.requestDate.toISOString() : undefined as any;
        data["projectRequestStage"] = this.projectRequestStage;
        data["projectName"] = this.projectName;
        data["organization"] = this.organization;
        data["businessLine"] = this.businessLine;
        data["requesterEmail"] = this.requesterEmail;
        data["optionalManualProjectNumber"] = this.optionalManualProjectNumber;
        data["chargeType"] = this.chargeType;
        data["primaryClient"] = this.primaryClient;
        data["vantagepointWbsn"] = this.vantagepointWbsn;
        data["stage"] = this.stage;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IProjectRequestBase {
    projectRequestId: number;
    requestDate: Date;
    projectRequestStage: ProjectRequestStage;
    projectName: string;
    organization: string;
    businessLine: BusinessLine;
    requesterEmail: string;
    optionalManualProjectNumber?: string | undefined;
    chargeType: ChargeType;
    primaryClient: string;
    vantagepointWbsn?: string | undefined;
    stage: StageKind;
}

/**
 * @toExtract
 */
export interface IProjectRequest extends IProjectRequestBase {
    additionalTasks: IAdditionalTask[];
    stageData: StageData;
}
/**
 * @toExtract
 */
export type ProjectRequestStage = "Pending" | "Approved" | "Changes Requested";

export class ProjectRequestUploadResponse implements IProjectRequestUploadResponse {
    message?: string | undefined;
    success?: boolean;

    constructor(data?: IProjectRequestUploadResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.message = _data["message"];
            this.success = _data["success"];
        }
    }

    static fromJS(data: any): ProjectRequestUploadResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRequestUploadResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        data["success"] = this.success;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IProjectRequestUploadResponse {
    message?: string | undefined;
    success?: boolean;
}

export class ProjectResponse implements IProjectResponse {
    projectRequestId?: number;

    constructor(data?: IProjectResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.projectRequestId = _data["projectRequestId"];
        }
    }

    static fromJS(data: any): ProjectResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["projectRequestId"] = this.projectRequestId;
        return data;
    }
}
/**
 * @toExtract
 */
export interface IProjectResponse {
    projectRequestId?: number;
}
/**
 * @toExtract
 */
export type ProjectType = "A&E-Aviation (Air Side - Runways, Taxiways,etc)" | "A&E-Aviation (Hangars)" | "A&E-Aviation (Land Side-Airport,Terminal,Parking)" | "A&E-Civil (Single Family Subdivisions)" | "A&E-Civil ( Mixed-Use Development)" | "A&E-Civil Engineering" | "A&E-General Building (Athletic Facilities)" | "A&E-General Building (Comm.l Building-Office/Ba)" | "A&E-General Building (Commercial buildings-Retail)" | "A&E-General Building (Commercial Corporate)" | "A&E-General Building (Commercial Hospitality)" | "A&E-General Building (Correctional)" | "A&E-General Building (Distribution, Warehouses)" | "A&E-General Building (Education)" | "A&E-General Building (Federal DoD Facilities)" | "A&E-General Building (Federal Non-DoD Facilities)" | "A&E-General Building (Healthcare)" | "A&E-General Building (Higher Education)" | "A&E-General Building (Historical Preservation)" | "A&E-General Building (Housing - Apartments)" | "A&E-General Building (Housing - Townhomes)" | "A&E-General Building (Housing Residential Condo)" | "A&E-General Building (Interior Design)" | "A&E-General Building (Judicial/Courtroom)" | "A&E-General Building (K-12 Education)" | "A&E-General Building (Libraries)" | "A&E-General Building (Medical/Hospital Facilities)" | "A&E-General Building (Parking Garages)" | "A& -General Building (Recreation)" | "A&E-General Building (Religious)" | "A&E-General Building (Residential)" | "A&E-General Building (Restaurant)" | "A&E-General Building (Senior Housing)" | "A&E-General Building (Student Housing)" | "A&E-Industrial" | "A&E-Manufacturing" | "A&E-MEP" | "A&E-Roof & Envelope Consulting" | "A&E-SE-Aviation (Hangars)" | "A&E-SE-Aviation (Land Side-Airport,Terminal,Pkng)" | "A&E-SE-General Building (Athletic Facilities)" | "A&E-SE-General Building (Comm buildings-Retail)" | "A&E-SE-General Building (Comm. building-Office/Ba)" | "A&E-SE-General Building (Commercial Corporate)" | "A&E-SE-General Building (Commercial Hospitality)" | "A&E-SE-General Building (Correctional)" | "A&E-SE-General Building (Distribution, Warehouses)" | "A&E-SE-General Building (Education)" | "A&E-SE-General Building (Fed Non-DoD Facilities)" | "A&E-SE-General Building (Federal DoD Facilities)" | "A&E-SE-General Building (Healthcare)" | "A&E-SE-General Building (Higher Education)" | "A&E-SE-General Building (Historical Preservation)" | "A&E-SE-General Building (Housing - Apartments)" | "A&E-SE-General Building (Housing - Townhomes)" | "A&E-SE-General Building (Housing Residential Condo)" | "A&E-SE-General Building (Interior Design)" | "A&E-SE-General Building (Judicial/Courtroom)" | "A&E-SE-General Building (K-12 Education)" | "A&E-SE-General Building (Libraries)" | "A&E-SE-General Building (Medical/Hosp Facilities)" | "A&E-SE-General Building (Parking Garages)" | "A&E-SE-General Building (Recreation)" | "A&E-SE-General Building (Religious)" | "A&E-SE-General Building (Residential)" | "A&E-SE-General Building (Restaurant)" | "A&E-SE-General Building (Senior Housing)" | "A&E-SE-General Building (Student Housing)" | "A&E-SE-Industrial" | "A&E-SE-Manufacturing" | "A&E-SE-MEP" | "A&E-SE-Roof & Envelope Consulting" | "A&E-Structural Engineering" | "Land-Bldg Services" | "Land-CMCI-Surveying" | "Land-Civil  (Single Family Subdivisions)" | "Land-Civil ( Mixed-Use Development)" | "Land-Civil Engineering" | "Land-Energy" | "Land-SE-Environmental (Natural Resources)" | "Land-Municipal Engineering Services" | "Land-Planning (Golf Course Planning)" | "Land-Planning (Single Family Subdivisions)" | "Land-Planning (Urban/Town Plng)" | "Land-Tran-HT (Asset Management)" | "Land-Utilities" | "Land-WATR-Environmental (Natural Rescouces)" | "Land-Sewerage (Pumping Stations)" | "Land-Sewerage (Sanitary & storm sewers)" | "Land-Sewerage (Wastewater treatment plants)" | "Land-Water (Storm Water System)" | "Land-Water Resources" | "Land-Water Supply (Booster Stations)" | "Land-Water Supply (Dams, reservoirs)" | "Land-Water Supply (Elevated Storage)" | "Land-Water Supply (Transmission & Distrib)" | "Land-Water Supply (Treatment, desalination)" | "Tran-BD (Bridge/Structure Design)" | "Tran-BD (GEC/Program Support)" | "Tran-BD (Marine & port Facilities)" | "Tran-BD (Municipal Engineering Services)" | "Tran-BI (Asset Management)" | "Tran-BI (Bridge Inspection)" | "Tran-BI (General Building (Residential))" | "Tran-BI (Municipal Engineering Services)" | "Tran-Construction Inspection" | "Tran-Construction Management" | "Tran-Construction Support Services" | "Tran-Materials Testing Lab Services" | "Tran-HT (Airports, including terminals)" | "Tran-HT (Asset Management)" | "Tran-HT (Digital Infrastructure)" | "Tran-HT (GEC/Program Support)" | "Tran-HT (Highway & Civil Design)" | "Tran-HT (Mass transit)" | "Tran-HT (Planning)" | "Tran-HT (Toll Operations)" | "Tran-HT (Traffic Engineering)" | "Tran-HT (TSMO/ITS)" | "Tran-HT (Right of Way Acquisition)" | "Tran-SE-Aviation (Air Side - Runaways, Taxiways,etc.)" | "Tran-SE-Construction Inspection" | "Tran-SE-Construction Management" | "Tran-SE-Construction Support Services" | "Tran-SE-Planning (Roadways)" | "Tran-SE-Tran-HT (Digital Infrastructure)" | "Tran-SE-Tran-HT (GEC/Program Support)" | "Tran-SE-Tran-HT (Highway & Civil Design)" | "Tran-SE-Tran-HT (Planning)" | "Tran-SE-Tran-HT (Toll Operations)" | "Tran-SE Tran-HT (Traffic Engineering)" | "Tran-SE Tran-HT (TSMO/ITS)";
/**
 * @toExtract
 */
export type Responsibility = "Prime Consultant" | "Subconsultant" | "Design Build- as Design Lead" | "Design Build- as Subconsultant" | "Joint Venture- as Lead JV Partner" | "Joint Venture- as Minority JV Partner" | "Undetermined";

/**
 * @toExtract
 */
export interface ISelectedAwaitingContractStageData extends IStageDataPreAwardMidStage {
}
/**
 * @toExtract
 */
export type ServiceOffering = "Architecture" | "Architecture-Historic Preservation" | "Bridge Design" | "Bridge Inspection" | "Bldg Plan Review" | "Civil Site Engineering" | "CM/CI" | "Dams/Levees" | "Environmental Permitting" | "Feasibility Studies" | "Geospatial" | "Highway and Roadway Design" | "Historical Data" | "Interior Design" | "Landscape Architecture" | "M/E/P" | "Master Planning" | "Right of Way Acquisition" | "Roof/Envelope Consulting" | "Stormwater Mgmt./Design" | "Structural Engineering (Building)" | "Surveying" | "Traffic Engineering" | "Transit Facilities and Infrastructure" | "Wastewater Collection/Treatment" | "Water Resources" | "Water Treatment/Distribution";

/**
 * @toExtract
 */
export interface IShortlistedStageData extends IStageDataInterviewing {
}

/**
 * @toExtract
 */
export interface ISolicitationRfpRfqStageData extends IStageDataPreAwardMidStage {
    solicitationContractNumber: string;
}

/**
 * @toExtract
 */
export interface ISourcesSoughtStageData extends IStageDataPreAward {
    sourcesSoughtDate: Date;
}

/**
 * @toExtract
 */
export interface IStageDataMid {
    marketSector: MarketSector;
    contractType: ContractTypeCategory;
    primaryServiceOffering: ServiceOffering;
    billingClient: string;
    projectDeliveryMethod: ProjectDeliveryMethod;
    responsibility: Responsibility;
    principalInCharge: string;
    projectManager: string;
    supervisor: string;
    biller: string;
    projectType: ProjectType;
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    addressLine3?: string | undefined;
    city?: string | undefined;
    state?: State;
    zipCode?: string | undefined;
    county?: string | undefined;
    projectDescriptionScope?: string | undefined;
    estimatedStartDate?: Date | undefined;
    estimatedEndDate?: Date | undefined;
}
/**
 * @toExtract
 */
export type StageKind = "LONG_LEAD" | "SOURCES_SOUGHT" | "SOLICITATION_RFP_RFQ" | "SUBMITTED" | "SHORTLISTED" | "INTERVIEWED" | "WON_AWAITING_CONTRACT" | "WON_CONTRACT_RECIEVED" | "LOST" | "NO_GO" | "CANCELLED";
/**
 * @toExtract
 */
export type State = "Alabama" | "Alaska" | "Arizona" | "Arkansas" | "California" | "Colorado" | "Connecticut" | "Delaware" | "Florida" | "Georgia" | "Hawaii" | "Idaho" | "Illinois" | "Indiana" | "Iowa" | "Kansas" | "Kentucky" | "Louisiana" | "Maine" | "Maryland" | "Massachusetts" | "Michigan" | "Minnesota" | "Mississippi" | "Missouri" | "Montana" | "Nebraska" | "Nevada" | "New Hampshire" | "New Jersey" | "New Mexico" | "New York" | "North Carolina" | "North Dakota" | "Ohio" | "Oklahoma" | "Oregon" | "Pennsylvania" | "Rhode Island" | "South Carolina" | "South Dakota" | "Tennessee" | "Texas" | "Utah" | "Vermont" | "Virginia" | "Washington" | "West Virginia" | "Wisconsin" | "Wyoming";

/**
 * @toExtract
 */
export interface ISubmittedStageData extends IStageDataPendingPreAwardMidStage {
    submittedDate: Date;
}

/**
 * @toExtract
 */
export interface IUpdateProjectRequest {
    projectRequestStage: ProjectRequestStage;
    projectName: string;
    organization: string;
    businessLine: BusinessLine;
    optionalManualProjectNumber?: string | undefined;
    chargeType: ChargeType;
    primaryClient: string;
    additionalTasks: INewAdditionalTask[];
    stage: StageKind;
    stageData: StageData;
}
/**
 * @toExtract
 */
export interface FileParameter {
    data?: any;
    fileName: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}