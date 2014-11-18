// JavaScript Document
d3.json("/js/EPI2_HDR_ColumnArrays.json");

//function ROI () {
//	this.name = name;
//	this.total = total;
//	this.mean = mean;
//};
//
//ROI.add = function() {
//		this.mean = this.total/276;
//	};
//ROI.total = function() {
//	for (x in EPI2.rPCCx) {
//	rPCCx.total += EPI2.rPCCx[x];
//};
//
//var lPCCx = new ROI(EPI2.lPCCx, 0, 0);

// preparing DMN average (rPCCx, rPCCx, rAngG_PCx, lAngG_PCx, lParaHC, rParaHC)

//var rPCCx = {
//	total: 0
//}
//
//for (x in EPI2.rPCCx) {
//	rPCCx.total += EPI2.rPCCx[x];
//};
//
//rPCCx.mean = rPCCx.total/276;
//
//
//var lPCCx = {
//	total: 0
//}
//
//for (x in EPI2.lPCCx) {
//	lPCCx.total += EPI2.lPCCx[x];
//};
//
//lPCCx.mean = lPCCx.total/276;
//
//var lAngG_PCx = {
//	total: 0
//}
//
//for (x in EPI2.lAngG_PCx) {
//	lAngG_PCx.total += EPI2.lAngG_PCx[x];
//};
//
//lAngG_PCx.mean = lAngG_PCx.total/276;
//
//
//var rAngG_PCx = {
//	total: 0
//}
//
//for (x in EPI2.rAngG_PCx) {
//	rAngG_PCx.total += EPI2.rAngG_PCx[x];
//};
//
//rAngG_PCx.mean = rAngG_PCx.total/276;
//
//var DMN_Mean = rPCCx.mean + lPCCx.mean + rAngG_PCx.mean + lAngG_PCx.mean;
//
//
////preparing Executive Control Network data (ACCx, ldPPCx, rdPPCx, r.dlPFCx, l.dlPFCx)
//var ACCx = {
//	total: 0
//}
//
//for (x in EPI2.ACCx) {
//	ACCx.total += EPI2.ACCx[x];
//};
//
//ACCx.mean = ACCx.total/276;
//
//var ldPPCx = {
//	total: 0
//}
//
//for (x in EPI2.ldPPCx) {
//	ldPPCx.total += EPI2.ldPPCx[x];
//};
//
//ldPPCx.mean = ldPPCx.total/276;
//
//
//var rdPPCx = {
//	total: 0
//}
//
//for (x in EPI2.rdPPCx) {
//	rdPPCx.total += EPI2.rdPPCx[x];
//};
//
//rdPPCx.mean = rdPPCx.total/276;
//
//
//
//
//var ECN_Mean = rPCCx.mean + lPCCx.mean + rAngG_PCx.mean + lAngG_PCx.mean;
//
////preparing Salince Netwoork average etc (lAMY, rAMY, lAI, rAI, lITCx, rITCx, rTPJ, lTPJ)
//var lAI = {
//	total: 0
//}
//
//for (x in EPI2.lAI) {
//	lAI.total += EPI2.lAI[x];
//};
//
//lAI.mean = lAI.total/276;
//
//var rAI = {
//	total: 0
//}
//
//for (x in EPI2.rAI) {
//	rAI.total += EPI2.rAI[x];
//};
//
//rAI.mean = rAI.total/276;
//
//var lAMY = {
//	total: 0
//}
//
//for (x in EPI2.lAMY) {
//	lAMY.total += EPI2.lAMY[x];
//};
//
//lAMY.mean = lAMY.total/276;
//
//var rAMY = {
//	total: 0
//}
//
//for (x in EPI2.rAMY) {
//	rAMY.total += EPI2.rAMY[x];
//};
//
//rAMY.mean = rAMY.total/276;
//
//var SN_Mean = rAI.mean + lAI.mean + rAMY.mean + lAMY.mean;
////preparing caudate (lCaudate, rCaudate)
//var lCaudate = {
//	total: 0
//}
//
//for (x in EPI2.lCaudate) {
//	lCaudate.total += EPI2.lCaudate[x];
//};
//
//lCaudate.mean = lCaudate.total/276;
//
//
//var rCaudate = {
//	total: 0
//}
//
//for (x in EPI2.rCaudate) {
//	rCaudate.total += EPI2.rCaudate[x];
//};
//
//rCaudate.mean = rCaudate.total/276;
//
//
//var Caudate_Mean = lCaudate.mean + rCaudate.mean;
//var Means = {
//	DMN: DMN_Mean,
//	ECN: ECN_Mean,
//	SN: SN_Mean
//}
