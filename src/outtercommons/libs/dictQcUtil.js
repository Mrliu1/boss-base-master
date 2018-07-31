import {dictToSelectArray} from './toolUtil.js'
// 检测内容
export const experimentItemCodeDict = {
  'WGS': 'WGS',
  'WGBS': 'WGBS',
  'WES': 'WES',
  '_16S': '16S',
  '_1K': '1K',
  'META': 'META',
  'Transcriptome': 'Transcriptome',
  'Fluidigm': 'Fluidigm',
  'SmallRNA': 'Small RNA',
  'Immune': 'Immune',
  'SerumHealthTell': 'HealthTell',
  'SerumSomaScan': 'SomaScan',
  'CellFreeDNA': '血液游离DNA',
  'Metabonomics': '代谢组',
  'Lipidome': '脂质组',
  'Proteomics': '蛋白组',
  'BloodBiomarkers': '血液生化指标',
  'BloodRoutineExamination': '血常规',
  'MicroRNA': 'micro RNA',
  'lncRNA': 'lnc RNA',
  'mRNA': 'mRNA',
  'TargetedBisulfite': 'TargetedBisulfite',
  'Metabonomics_37A': '代谢组-37种氨基酸',
  'Metabonomics_12V': '代谢组-12种维生素',
  'Metabonomics_15H': '代谢组-15种荷尔蒙',
  'Microelement': '微量元素',
  'HeavyMetal': '重金属',
  'AminoAcid': '氨基酸',
  'Hormone': '激素',
  'QPCR': 'QPCR',
  'WTBS': 'WTBS',
  'Estrogen': '雌激素代谢健康评估(尿液)',
  'Wegene': 'Wegene',
  'Vitamine': '维生素',
  'MicroElement_HeavyMetals': '微量元素+重金属',
  'IsolationQc': '提取QC'
}

// 质检方案状态
export const programStateDict = {
  'Active': '启用',
  'Disabled': '禁用'
}

// 质检内容
export const qcTypeDict = {
  Qbit: 'Qubit',
  'Concentration': '质量浓度',
  'Nanodrop': 'Nanodrop',
  'Labchip': 'Labchip',
  'Qpcr': 'QPCR',
  '_2100': '2100',
  'GelElectrophore': '凝胶电泳',
  MicroplateReader: '酶标仪'
}
// 检测内容
export const experimentItemCodeDataArr = dictToSelectArray(experimentItemCodeDict)
// 质检方案状态
export const programStateDataArr = [
  { key: 'Active', value: '启用' },
  { key: 'Disabled', value: '禁用' }
]
// 质检内容
export const qcTypeDataArr = [
  { key: 'Qbit', value: 'Qbit' },
  { key: 'MicroplateReader', value: '酶标仪' },
  { key: 'Concentration', value: '质量浓度' },
  { key: 'Nanodrop', value: 'Nanodrop' },
  { key: 'Labchip', value: 'Labchip' },
  { key: 'Qpcr', value: 'QPCR' },
  { key: '_2100', value: '2100' },
  { key: 'GelElectrophore', value: '凝胶电泳' }
]

// 批次质控状态
export const batchControlStateDict = {
  InControl: '在控',
  OutOfControl: '失控',
  FreeControl: '免控',
  Progressing: '质检中',
  DecidePending: '待评估',
  NoBatch: '-（无批次）'
}
export const batchControlStateData = dictToSelectArray(batchControlStateDict)
// QC状态
export const qcStateDict = {
  Progressing: '质检中',
  Determination: '待判定',
  Finished: '已完成',
  Canceled: '已取消',
  WaitProgram: '方案待分配',
  Success: '合格',
  Fail: '不合格'
}
export const qcStateData = dictToSelectArray(qcStateDict)
// 系统判定结果、人为判定结果、质检结果
export const systemResultDict = {
  Success: '合格',
  Fail: '不合格'
}
export const systemResultData = dictToSelectArray(systemResultDict)
// 质检状态
export const qualityStateDict = {
  Cancel: '取消',
  Finished: '实验完成',
  Progressing: '实验进行中',
  DecidePending: '待判定',
  Pending: '待处理',
  Failed: '节点失败'
}
export const qualityStateData = dictToSelectArray(qualityStateDict)
// 存储容器
export const containerDict = {
  SAMPLE_TUBE: '样本管',
  PORE_PLATE: '孔板'
}
export const containerData = dictToSelectArray(containerDict)
// 更新数据
export const isUpdateDict = {
  true: '是',
  false: '否'
}
export const isUpdateData = dictToSelectArray(isUpdateDict)
// 质检原因
export const qualityReasonDict = {
  AutoAllocation: '系统分配',
  ManualAllocation: '人为分配',
  AddTest: '加测',
  ReTest: '重测',
  UncontrolledReTest: '失控重测'
}
export const qualityReasonData = dictToSelectArray(qualityReasonDict)
// 实验步骤
export const nodeTypeDict = {
  Isolation: '制备',
  Outsource: '外包',
  Library: '建库',
  Sequence: '上机',
  MassSpectra: '质谱',
  SequencePooling: '上机Pooling',
  HybPooling: '杂交Pooling',
  QC: 'QC',
  LibPrePooling: '建库Pooling',
  PCR: '建库PCR',
  NGS: '上机测序',
  None: '无',
  NoSeqOutSource: '非测序外包'
}
export const nodeTypeData = dictToSelectArray(nodeTypeDict)
// 任务类型
export const taskTypeDict = {
  DNA: 'DNA提取',
  RNA: 'RNA提取',
  'WGS': 'WGS',
  'WGBS': 'WGBS',
  'WES': 'WES',
  '_16S': '16S',
  '_1K': '1K',
  'META': 'META',
  'Transcriptome': 'Transcriptome',
  'Fluidigm': 'Fluidigm',
  'SmallRNA': 'Small RNA',
  'Immune': 'Immune',
  'SerumHealthTell': 'HealthTell',
  'SerumSomaScan': 'SomaScan',
  'CellFreeDNA': '血液游离DNA',
  'Metabonomics': '代谢组',
  'Lipidome': '脂质组',
  'Proteomics': '蛋白组',
  'BloodBiomarkers': '血液生化指标',
  'BloodRoutineExamination': '血常规',
  'MicroRNA': 'micro RNA',
  'lncRNA': 'lnc RNA',
  'mRNA': 'mRNA',
  'TargetedBisulfite': 'TargetedBisulfite',
  'Metabonomics_37A': '代谢组-37种氨基酸',
  'Metabonomics_12V': '代谢组-12种维生素',
  'Metabonomics_15H': '代谢组-15种荷尔蒙',
  'Microelement': '微量元素',
  'HeavyMetal': '重金属',
  'AminoAcid': '氨基酸',
  'Hormone': '激素',
  'QPCR': 'QPCR',
  'WTBS': 'WTBS',
  'Estrogen': '雌激素代谢健康评估(尿液)',
  'Wegene': 'Wegene',
  'Vitamine': '维生素',
  'MicroElement_HeavyMetals': '微量元素+重金属',
  'IsolationQc': '提取QC'
}
export const taskTypeData = dictToSelectArray(taskTypeDict)
