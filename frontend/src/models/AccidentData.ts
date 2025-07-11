export interface InspectorReportData {
  accident_uuid: string;
  jurisdiction_of_inspector: string;
  accident_id: string;
  date_of_accident: string;
  bonet_no: string;
  inquiry_inspector_name: string;
  fir_registered: boolean;
  fir_number: string;
  under_section_details: string;
  accused_in_accident_in_fir: string;
  fir_case_against_ksrtc: boolean;
  date_of_bus_released_from_police_station: string;
  enquiry_police_person_name: string;
  enquiry_police_phone_number: string;
  witness: string;
  primary_cause_of_accident_in_insp_report: string;
  responsibility_of_accident_in_insp_report: string;
  if_not_ksrtc_responsible_action_taken: string;
  whether_fir_is_modified_or_not: boolean;
  responsibility_changed_from_ksrtc_as_per_evidence_submitted: boolean;
  total_no_of_days_bus_docked_due_to_accident: number;
  revenue_loss_due_to_dock_of_bus: number;
  inspector_report_additional_details: string;
  remarks: string;
  whether_bus_have_valid_insurance_or_not: boolean;
  created_by: string;
  waybill: string;
  unit: string;
  summary_of_inspector_report: string;
  upload_document: string;
  document_filename: string;
  document_content_type: string;
  digital_evidence_files: {
    content: string;
  }[];
  schedule_details: string;
}

export interface AccidentInsuranceModel {
  accident_id: string;
  type_of_insurance: string;
  insurance_claim_applied: boolean;
  insurance_company_name: string;
  policy_number: string;
  claim_number: string;
  date_of_insurance_claim_applied: string;
  name_of_spot_surveyor: string;
  spot_surveyor_phone_number: string;
  final_bill_submitted_insurance_co: boolean;
  final_bill_amount_to_ksrtc: number;
  approved_amount_by_insurance_co: number;
  admitted_amount_by_insurance_co: number;
  payment_settled: boolean;
  date_of_payment_settled: string | null;
  remarks: string;
  created_by: string;
}

export interface AccidentWorkshopReport {
  accident_id?: string;
  bonet_no?: string;
  created_by?: string;
  accident_reference_number?: string;
  date_of_accident?: string;
  bus_no?: string;
  repair_work_done_at_workshop?: boolean;
  workshop_depot_name?: string;
  date_of_entry?: string;
  date_of_work_start?: string;
  date_of_released?: string;
  no_of_days_at_workshop?: number;
  insurance_surveyor_name?: string;
  insurance_surveyor_phone_number?: string;
  damage_to_bus?: string;
  damage_assessment_report?: string;
  spare_part_cost?: number;
  labour_cost?: number;
  total_bill_amount?: number;
  cost_of_damage?: number;
  cod_recovered?: boolean;
  cod_recovery_amount?: number;
  vehicle_towed_status?: boolean;
  towing_charges?: number;
  towing_company_name?: string;
  repair_status?: string;
  work_completion_percentage?: number;
  quality_check_status?: boolean;
  work_order_number?: string;
  invoice_number?: string;
  final_inspection_report?: string;
  remarks?: string;
  individual_bill_document_s3_path?: string;
  total_bill_document_s3_path?: string;
}
