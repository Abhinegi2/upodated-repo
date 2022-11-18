import { FuseUtils } from '@fuse/utils';

export class VTRTrainingOfTeacherModel {
    TrainingBy: string;
    TrainingTypeId: string;
    TrainingTopicIds: string;
    TrainingDetails: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.TrainingBy = vtDailyReportingItem.TrainingBy || '';
        this.TrainingTypeId = vtDailyReportingItem.TrainingTypeId || '';
        this.TrainingTopicIds = vtDailyReportingItem.TrainingTopicIds || '';
        this.TrainingDetails = vtDailyReportingItem.TrainingDetails || '';
    }
}
