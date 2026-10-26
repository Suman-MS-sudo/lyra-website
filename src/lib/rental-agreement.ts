import {
  RECHARGE_PLANS,
  RENTAL_ADVANCE_MONTHS,
  RENTAL_DEPOSIT,
  RENTAL_GRACE_DAYS,
  RENTAL_INCLUDED,
  RENTAL_MIN_YEARS,
  RENTAL_MODELS,
  RENTAL_PLANS,
  rupees,
} from "@/lib/rental";

/**
 * Lyra Equipment Rental Agreement: the single source for the public page (/rental-agreement),
 * the checkout consent dialog and the per-customer PDF emailed after payment.
 *
 * Bump AGREEMENT_VERSION whenever the wording changes: the version a customer accepted is stored
 * with their booking and printed on their copy.
 *
 * Client-safe: plain data and string helpers only.
 */

export const AGREEMENT_VERSION = "LYR-RA v1.0";
export const AGREEMENT_DATE = "26 October 2026";
export const AGREEMENT_PATH = "/rental-agreement";
export const AGREEMENT_TITLE = "Equipment Rental Agreement";

/** Early-termination fee, in months of Monthly Rent (plus GST), payable before the Minimum Term ends. */
export const EARLY_TERMINATION_MONTHS = 3;
/** Notice period (days) for termination by either party. */
export const NOTICE_DAYS = 30;
/** Days within which the deposit is refunded after the Equipment is returned and dues are settled. */
export const DEPOSIT_REFUND_DAYS = 30;
/** Days after the Grace Period ends with dues unpaid before Lyra may terminate. */
export const NONPAYMENT_TERMINATION_DAYS = 30;
/** Days a material breach may remain uncured after notice. */
export const CURE_DAYS = 15;

export const LESSOR = {
  name: "Lyra Enterprises",
  // Kept in sync with SITE in lib/data.ts (not imported: this file is bundled client-side).
  address: "10/21, Vasuki Street, Cholapuram, Ambattur, Chennai – 600053, Tamil Nadu, India",
  email: "sales@lyraenterprise.co.in",
  phone: "+91-81223 78860",
  /** Shown on the agreement when set. */
  gstin: "",
  signatory: "Authorised Signatory",
};

export type Clause = string | { text: string; items: string[] };
export type AgreementSection = { n: number; title: string; clauses: Clause[] };

const modelList = RENTAL_MODELS.map((m) => `Lyra ${m.name}`).join(", ").replace(/, ([^,]*)$/, " or $1");
const recharges = RECHARGE_PLANS.map((p) => `${p.label} (${p.months} month${p.months > 1 ? "s" : ""}${p.discountPct ? `, ${p.discountPct}% discount on Rent` : ""})`).join("; ");

/** The numbered body of the agreement. Customer-specific values live in Schedule A. */
export function agreementSections(): AgreementSection[] {
  const s: Omit<AgreementSection, "n">[] = [
    {
      title: "Definitions and Interpretation",
      clauses: [
        {
          text: "In this Agreement, unless the context requires otherwise:",
          items: [
            "\"Agreement\" means these terms together with Schedule A (Rental Details) and Schedule B (Service Scope), as accepted electronically by the Customer.",
            "\"Equipment\" means each sanitary napkin vending machine described in Schedule A, together with its parts, accessories, firmware, keys and any replacement supplied by Lyra.",
            "\"Effective Date\" means the date on which the Customer accepts this Agreement electronically and pays the Signing Amount.",
            "\"Commencement Date\" means, for each item of Equipment, the date on which Lyra completes its installation at the Site.",
            `"Minimum Term" means ${RENTAL_MIN_YEARS * 12} (${RENTAL_MIN_YEARS * 12 === 36 ? "thirty-six" : RENTAL_MIN_YEARS * 12}) months from the Commencement Date.`,
            "\"Monthly Rent\" means the rent per item of Equipment per month stated in Schedule A, exclusive of GST.",
            "\"Signing Amount\" means the amount payable on the Effective Date under Clause 5.",
            "\"Recharge\" means an advance payment of Monthly Rent for one or more months made under Clause 4.",
            "\"Paid-Until Date\" means the last day of the period for which Monthly Rent has been paid.",
            `"Grace Period" means the ${RENTAL_GRACE_DAYS} (${RENTAL_GRACE_DAYS === 7 ? "seven" : RENTAL_GRACE_DAYS}) days immediately following the Paid-Until Date.`,
            "\"Site\" means the installation address stated in Schedule A.",
            "\"Consumables\" means sanitary napkins and any other goods dispensed by the Equipment.",
            "\"Monitoring Portal\" means Lyra's online dashboard through which the Customer can view the status and usage of the Equipment.",
            "\"GST\" means goods and services tax under applicable Indian law.",
          ],
        },
        "Headings are for convenience only. Words in the singular include the plural and vice versa. \"Including\" means \"including without limitation\". A reference to a law includes that law as amended or re-enacted.",
      ],
    },
    {
      title: "Rental of Equipment",
      clauses: [
        "Lyra agrees to let, and the Customer agrees to take on rent, the Equipment described in Schedule A for use at the Site, on the terms of this Agreement.",
        "This Agreement is a contract of rental only. It is not a sale, hire-purchase, or lease with an option to purchase, and no part of the Rent shall be treated as payment towards the price of the Equipment.",
        `The Equipment shall be one of the following models, as selected in Schedule A: ${modelList}, with the napkin capacity stated in Schedule A.`,
      ],
    },
    {
      title: "Term",
      clauses: [
        "This Agreement takes effect on the Effective Date. The rental of each item of Equipment begins on its Commencement Date.",
        `The rental shall continue for the Minimum Term and thereafter from month to month until terminated by either party under Clause 18. The Minimum Term is a lock-in period, subject only to the early-termination right in Clause 18.2.`,
      ],
    },
    {
      title: "Rent, GST and Recharges",
      clauses: [
        "The Customer shall pay the Monthly Rent for each item of Equipment from the Commencement Date. Rent is payable in advance.",
        "GST at the applicable rate (currently 18%) is payable in addition to the Monthly Rent and all other amounts under this Agreement, and Lyra shall issue tax invoices in accordance with GST law.",
        `Rent after the Signing Amount is paid by Recharge through Lyra's website or as otherwise agreed in writing. The Customer may choose any of the following Recharge plans: ${recharges}. Discounts apply to the Rent before GST.`,
        "Each Recharge extends the Paid-Until Date from the existing Paid-Until Date, so that any unpaid period is always covered first. Rent paid before the Commencement Date is credited from the Commencement Date.",
        "The Monthly Rent stated in Schedule A shall not be increased during the Minimum Term. After the Minimum Term, Lyra may revise the Monthly Rent by giving the Customer at least sixty (60) days' written notice.",
        "Recharges are non-refundable except as expressly provided in Clause 18.6.",
        "If the Customer is required by law to deduct tax at source from any payment, it shall deduct and deposit that tax within the statutory time and furnish the tax deduction certificate to Lyra. If the certificate is not furnished, the amount deducted shall be treated as unpaid.",
      ],
    },
    {
      title: "Signing Amount and Security Deposit",
      clauses: [
        {
          text: "On the Effective Date the Customer shall pay, for each item of Equipment, one of the following (as selected in Schedule A):",
          items: [
            `Option A: a refundable security deposit of ${rupees(RENTAL_DEPOSIT)} plus the first month's Monthly Rent, together with GST on both; or`,
            `Option B: ${RENTAL_ADVANCE_MONTHS} (${RENTAL_ADVANCE_MONTHS === 3 ? "three" : RENTAL_ADVANCE_MONTHS}) months' Monthly Rent in advance, together with GST, without a security deposit.`,
          ],
        },
        "The rent included in the Signing Amount is credited towards the first month (Option A) or the first three months (Option B) from the Commencement Date.",
        "The security deposit is interest-free and is held as security for the Customer's obligations. It is not an advance against Rent and the Customer may not set it off against Rent during the term.",
        `Within ${DEPOSIT_REFUND_DAYS} (${DEPOSIT_REFUND_DAYS === 30 ? "thirty" : DEPOSIT_REFUND_DAYS}) days after the Equipment is returned to Lyra and all amounts due are settled, Lyra shall refund the security deposit, after deducting any Rent, early-termination fee, damage charges or other amounts due from the Customer. GST charged on the deposit shall be refunded or adjusted in accordance with applicable GST law, including by credit note.`,
      ],
    },
    {
      title: "Late Payment, Grace Period and Suspension",
      clauses: [
        "Lyra will endeavour to send payment reminders by email before the Paid-Until Date. Non-receipt of a reminder does not relieve the Customer of its obligation to pay on time.",
        `If Rent is not paid by the Paid-Until Date, the Equipment shall continue to operate during the Grace Period. If Rent remains unpaid after the Grace Period, Lyra may, without further notice and without liability, remotely suspend UPI, RFID and other electronically controlled vending and any other function of the Equipment until all overdue Rent is paid.`,
        "Suspension does not suspend or reduce the Customer's obligation to pay Rent, which continues to accrue during any suspension.",
        `If any amount remains unpaid for ${NONPAYMENT_TERMINATION_DAYS} (${NONPAYMENT_TERMINATION_DAYS === 30 ? "thirty" : NONPAYMENT_TERMINATION_DAYS}) days after the end of the Grace Period, Lyra may terminate this Agreement under Clause 18.3 and recover the Equipment.`,
      ],
    },
    {
      title: "Delivery and Installation",
      clauses: [
        "Lyra shall deliver and install the Equipment at the Site on a date agreed with the Customer. Delivery and installation are included in the Rent unless otherwise agreed in writing.",
        {
          text: "Before the agreed date the Customer shall, at its own cost:",
          items: [
            "provide a safe, dry and suitable wall location approved by Lyra, protected from direct water spray;",
            "provide a 230 V AC single-phase power socket with proper earthing within reach of the Equipment;",
            "for IoT WiFi models, provide a 2.4 GHz WiFi network with internet access; for IoT Ethernet and RFID models, provide a wired LAN point with internet access;",
            "obtain any permission required from the owner or administrator of the Site; and",
            "give Lyra's personnel safe access to the Site during business hours.",
          ],
        },
        "If installation cannot be completed because the Customer has not met Clause 7.2, Lyra may charge reasonable costs of a repeat visit. Lyra shall show the Customer's staff how to refill and operate the Equipment.",
      ],
    },
    {
      title: "Maintenance, Service and Parts",
      clauses: [
        "During the term, Lyra shall, at no charge beyond the Rent, provide the services described in Schedule B, including installation, regular preventive servicing, breakdown support, repair or replacement of parts that fail through normal wear and tear or manufacturing defect, software and firmware updates, and access to the Monitoring Portal with alerts.",
        "Lyra shall use reasonable endeavours to resolve reported faults promptly, remotely where possible and by site visit where needed. Response and resolution times are not guaranteed and depend on location and the nature of the fault.",
        "Lyra may replace any item of Equipment, or any part of it, with an equivalent or better unit at any time.",
        "Free service does not cover: damage described in Clause 11; faults caused by the Site's power supply, wiring or network; Consumables; or any repair, modification or opening of the Equipment by anyone other than Lyra.",
      ],
    },
    {
      title: "Consumables",
      clauses: [
        "Napkin refills are not included in the Rent. The Customer shall purchase all sanitary napkins and other Consumables for the Equipment exclusively from Lyra, at Lyra's prices prevailing at the time of order, on separate invoices.",
        "The Customer shall not load any Consumables not supplied by Lyra. Any fault or damage caused by non-Lyra Consumables is not covered by free service and will be charged at Lyra's prevailing rates.",
        "The Customer is responsible for refilling the Equipment and for the safe disposal of used napkins and packaging in accordance with applicable waste management rules.",
      ],
    },
    {
      title: "Customer's Obligations",
      clauses: [
        {
          text: "The Customer shall:",
          items: [
            "use the Equipment only at the Site, only for dispensing Consumables, and in accordance with Lyra's instructions;",
            "take reasonable care of the Equipment and keep it secure, clean and dry;",
            "keep the Equipment connected to power and, for IoT and RFID models, to the network, so that it can be monitored and maintained;",
            "keep the Equipment's keys safe and allow only trained staff to open the refill compartment;",
            "report any fault, damage, theft or loss to Lyra promptly and in any event within forty-eight (48) hours of becoming aware of it;",
            "give Lyra reasonable access to inspect, service, repair, replace or remove the Equipment; and",
            "comply with all laws applicable to the Site and to the use of the Equipment.",
          ],
        },
        {
          text: "The Customer shall not, without Lyra's prior written consent:",
          items: [
            "move the Equipment from the Site or install it elsewhere;",
            "open, alter, repair, tamper with or attach anything to the Equipment, other than refilling through the refill door;",
            "remove or obscure any label, serial number or ownership marking; or",
            "sell, sub-let, lend, part with possession of, or create any charge, lien or encumbrance over the Equipment.",
          ],
        },
      ],
    },
    {
      title: "Risk, Loss and Damage",
      clauses: [
        "Risk of loss of and damage to the Equipment passes to the Customer on delivery to the Site and remains with the Customer until the Equipment is collected by Lyra.",
        "The Customer shall pay Lyra the cost of repairing or replacing the Equipment, at Lyra's prevailing rates, if it is lost, stolen or damaged other than by normal wear and tear or a manufacturing defect, including damage caused by misuse, negligence, vandalism, theft, fire, water, power surges or faults in the Site's electrical installation, or unauthorised repairs.",
        "The Customer's liability under Clause 11.2 for any one item of Equipment shall not exceed the published list price of that model on the date of the loss or damage.",
        "The Customer may, at its own option and cost, insure the Equipment while at the Site. Rent continues to be payable while repairs are carried out under this Clause, unless Lyra agrees otherwise.",
      ],
    },
    {
      title: "Ownership",
      clauses: [
        "The Equipment is and shall at all times remain the sole and absolute property of Lyra. The Customer acquires only the right to use it under this Agreement.",
        "The Equipment shall remain movable property and shall not become a fixture of the Site even if attached to a wall or structure.",
        "If any third party asserts a claim against the Equipment, or the Customer becomes the subject of insolvency proceedings, the Customer shall immediately notify Lyra and inform the third party or insolvency professional that the Equipment belongs to Lyra.",
      ],
    },
    {
      title: "Monitoring Portal, Data and Software",
      clauses: [
        "Lyra grants the Customer a non-exclusive, non-transferable right, for the duration of this Agreement, to access the Monitoring Portal for the Equipment through user accounts issued by Lyra. The Customer is responsible for keeping its login credentials confidential.",
        "The Equipment transmits operational data such as stock level, dispensing count, transactions, machine status, connectivity and fault information. Lyra may collect, store and use this data to provide the services, issue alerts, bill, improve its products and comply with law.",
        "Where the Customer uploads or uses personal data (for example names of RFID card holders), the Customer confirms that it has a lawful basis and any notice or consent required under the Digital Personal Data Protection Act, 2023 and other applicable law. Lyra shall process such data only for the purposes of this Agreement and in accordance with its Privacy Policy.",
        "All firmware, software, designs and intellectual property in the Equipment and the Monitoring Portal remain the property of Lyra or its licensors. The Customer shall not copy, modify, reverse engineer or attempt to access the source code of any of them.",
        "Lyra shall use reasonable endeavours to keep the Monitoring Portal available, but does not guarantee uninterrupted or error-free availability, which depends on networks outside Lyra's control.",
      ],
    },
    {
      title: "Payments Made by End Users",
      clauses: [
        "Where end users pay at the Equipment (by coin, UPI or RFID card), the collection, settlement and accounting of those amounts shall be as set out in Schedule A or as otherwise agreed in writing between the parties. Such amounts are separate from, and do not reduce, the Rent payable by the Customer.",
      ],
    },
    {
      title: "Warranties",
      clauses: [
        "Lyra warrants that it owns the Equipment, has the right to rent it to the Customer, and that the Equipment will be in good working order on the Commencement Date and will be maintained in accordance with Clause 8.",
        "The Customer warrants that it has full authority to enter into this Agreement and that the person accepting it on the Customer's behalf is authorised to do so.",
        "Except as expressly stated in this Agreement, all other warranties, conditions and representations, whether express or implied by law, are excluded to the fullest extent permitted by law.",
      ],
    },
    {
      title: "Limitation of Liability",
      clauses: [
        "Neither party shall be liable to the other for any indirect, incidental, special or consequential loss, or for loss of profit, revenue, business or goodwill, arising out of or in connection with this Agreement.",
        "Lyra's total aggregate liability arising out of or in connection with this Agreement, whether in contract, tort (including negligence) or otherwise, shall not exceed the total Rent paid by the Customer in the twelve (12) months immediately preceding the event giving rise to the claim.",
        "Nothing in this Agreement limits liability for death or personal injury caused by negligence, for fraud, or for any liability that cannot lawfully be limited, and Clause 16.2 does not limit the Customer's obligations to pay Rent, fees and charges under this Agreement.",
      ],
    },
    {
      title: "Indemnity",
      clauses: [
        "The Customer shall indemnify Lyra against all losses, claims, costs and expenses (including reasonable legal fees) arising from any breach of this Agreement by the Customer, the negligence or wilful misconduct of the Customer or its personnel, the condition of the Site, or any personal data supplied by the Customer.",
        "Lyra shall indemnify the Customer against third-party claims that the Equipment or the Monitoring Portal, as supplied by Lyra, infringes any intellectual property right in India, provided the Customer notifies Lyra promptly and allows Lyra to conduct the defence.",
      ],
    },
    {
      title: "Termination",
      clauses: [
        `After the Minimum Term, either party may terminate this Agreement for any item of Equipment by giving the other at least ${NOTICE_DAYS} (${NOTICE_DAYS === 30 ? "thirty" : NOTICE_DAYS}) days' written notice.`,
        `The Customer may terminate this Agreement for any item of Equipment before the end of the Minimum Term by giving at least ${NOTICE_DAYS} days' written notice and paying, before the termination takes effect, an early-termination fee equal to ${EARLY_TERMINATION_MONTHS} (${EARLY_TERMINATION_MONTHS === 3 ? "three" : EARLY_TERMINATION_MONTHS}) months' Monthly Rent plus GST for that item, together with all other amounts then due. The parties agree that this fee is a genuine pre-estimate of Lyra's loss and not a penalty.`,
        {
          text: "Lyra may terminate this Agreement with immediate effect by written notice if:",
          items: [
            `any amount remains unpaid as described in Clause 6.4;`,
            `the Customer commits a material breach which, if capable of remedy, is not remedied within ${CURE_DAYS} (${CURE_DAYS === 15 ? "fifteen" : CURE_DAYS}) days of written notice;`,
            "the Equipment is used for any unlawful purpose, or is moved, sub-let or encumbered in breach of Clause 10; or",
            "the Customer becomes insolvent, is the subject of a winding-up, liquidation or insolvency resolution process, or ceases to carry on business.",
          ],
        },
        "Lyra may also terminate this Agreement by written notice if continued performance becomes unlawful or the Equipment model is discontinued and cannot be replaced with an equivalent unit, in which case no early-termination fee is payable and Clause 18.6 applies.",
        "On termination for any reason, the Customer shall pay all Rent and other amounts accrued up to the termination date, and shall give Lyra access to de-install and collect the Equipment within seven (7) days. Lyra shall bear the cost of collection, except where termination results from the Customer's breach, in which case the Customer shall reimburse Lyra's reasonable costs of recovery.",
        "Rent paid in advance for any period after the termination date shall be adjusted against amounts due to Lyra and any balance refunded with the security deposit under Clause 5.4. Where a discounted Quarterly or Yearly Recharge is only partly used, the used portion shall be recalculated at the Monthly rate before the balance is determined.",
        "Termination does not affect rights and obligations accrued before termination. Clauses 5, 11, 12, 13.4, 16, 17, 18, 20, 22 and 23 survive termination.",
      ],
    },
    {
      title: "Force Majeure",
      clauses: [
        "Neither party is liable for delay or failure to perform its obligations (other than payment obligations) caused by events beyond its reasonable control, including natural disasters, epidemics, fire, flood, war, riots, government action, strikes, or failure of public power or telecommunication networks. The affected party shall notify the other promptly and use reasonable efforts to resume performance. If such an event continues for more than sixty (60) days, either party may terminate this Agreement by written notice without an early-termination fee.",
      ],
    },
    {
      title: "Confidentiality",
      clauses: [
        "Each party shall keep confidential the terms of this Agreement and any non-public information received from the other, and shall use it only for the purposes of this Agreement, except where disclosure is required by law or is made to its professional advisers, auditors or financiers under a duty of confidence.",
      ],
    },
    {
      title: "Notices",
      clauses: [
        `Notices under this Agreement shall be in writing and sent by email or by registered post or courier: to Lyra at ${LESSOR.email} and ${LESSOR.address}; and to the Customer at the email address and Site address in Schedule A, or such other address as a party notifies in writing.`,
        "A notice sent by email is deemed received when sent, unless the sender receives a delivery-failure message. A notice sent by post or courier is deemed received three (3) business days after dispatch.",
      ],
    },
    {
      title: "Electronic Execution and Records",
      clauses: [
        "This Agreement is entered into electronically. The Customer accepts it by ticking the acceptance box and completing payment of the Signing Amount on Lyra's website. Under the Information Technology Act, 2000 and the Indian Contract Act, 1872, this electronic acceptance forms a valid and binding contract and has the same effect as a handwritten signature.",
        "Lyra executes this Agreement through its Authorised Signatory by electronic signature as shown in the execution block. Lyra's electronic records of the Customer's acceptance, including the date and time, IP address, agreement version and payment reference, are conclusive evidence of acceptance, save for manifest error.",
        "A copy of this Agreement, completed with Schedule A, is emailed to the Customer as a PDF. Each party may retain and print it, and either party may request a physically signed counterpart.",
        "Any stamp duty payable on this Agreement under applicable stamp law shall be borne by the Customer.",
      ],
    },
    {
      title: "Governing Law and Dispute Resolution",
      clauses: [
        "This Agreement is governed by the laws of India.",
        "The parties shall first try in good faith to resolve any dispute arising out of or in connection with this Agreement by discussion between senior representatives within thirty (30) days of a written notice of dispute.",
        "Any dispute not so resolved shall be referred to final and binding arbitration by a sole arbitrator appointed by mutual agreement of the parties, failing which in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Chennai, Tamil Nadu, and the proceedings shall be conducted in English.",
        "Subject to Clause 23.3, the courts at Chennai, Tamil Nadu shall have exclusive jurisdiction. Nothing in this Clause prevents Lyra from seeking urgent interim relief, including to protect or recover the Equipment, from any court of competent jurisdiction.",
      ],
    },
    {
      title: "General",
      clauses: [
        "This Agreement, together with Lyra's tax invoices and Privacy Policy, is the entire agreement between the parties about its subject matter and supersedes all prior discussions and quotations.",
        "Any amendment must be in writing and agreed by both parties, except that Lyra may update operational procedures (such as payment channels and support contacts) by notice, provided the Customer's rights are not materially reduced.",
        "The Customer may not assign or transfer this Agreement without Lyra's prior written consent. Lyra may assign this Agreement or its receivables to an affiliate, successor or financier by notice to the Customer.",
        "If any provision is held invalid or unenforceable, the remaining provisions continue in full force, and the invalid provision shall be replaced by a valid one that most closely achieves its intent.",
        "A failure or delay in exercising any right is not a waiver of it. The parties are independent contractors and nothing in this Agreement creates a partnership, agency or employment relationship.",
        "If there is any conflict, Schedule A prevails over these terms, and these terms prevail over Schedule B.",
      ],
    },
  ];
  return s.map((x, k) => ({ ...x, n: k + 1 }));
}

/** Schedule B: what the Rent covers, and what it does not. */
export function scheduleB(): { included: { title: string; body: string }[]; excluded: string[] } {
  return {
    included: RENTAL_INCLUDED.map(({ title, body }) => ({ title, body })),
    excluded: [
      "Sanitary napkins and other Consumables (purchased separately from Lyra).",
      "Repairs or replacement due to loss or damage described in Clause 11 (charged at Lyra's rates, capped at the model's list price).",
      "Faults caused by the Site's power supply, wiring, earthing or network.",
      "Relocation of the Equipment within or away from the Site, unless agreed in writing.",
    ],
  };
}

/** Customer-specific values for Schedule A and the execution block. */
export type AgreementParties = {
  ref: string;
  rentalCodes: string[];
  customerName: string;
  organisation: string;
  gstin: string;
  email: string;
  phone: string;
  siteAddress: string;
  planId: string;
  modelSlug: string;
  qty: number;
  upfront: "deposit" | "advance";
  signingTotal: number;
  /** Consent record captured at booking. */
  acceptedAt: string;
  acceptedIp: string;
  acceptedVersion: string;
  paymentId: string;
  orderId: string;
};

/** Rows of Schedule A for a booking (or the generic plan list when `p` is omitted). */
export function scheduleA(p?: AgreementParties): [string, string][] {
  if (!p) {
    return [
      ["Customer", "As entered at booking"],
      ["Site", "Installation address entered at booking"],
      ["Equipment", `${modelList}, as selected at booking`],
      ["Capacity and Monthly Rent", RENTAL_PLANS.map((x) => `${x.capacity} napkins: ${rupees(x.price)}`).join("; ") + " per machine per month, plus GST"],
      ["Signing Amount", `Option A: ${rupees(RENTAL_DEPOSIT)} refundable deposit + first month's Rent, plus GST; or Option B: ${RENTAL_ADVANCE_MONTHS} months' Rent in advance, plus GST`],
      ["Recharge plans", recharges],
      ["Minimum Term", `${RENTAL_MIN_YEARS * 12} months from the Commencement Date`],
      ["Grace Period", `${RENTAL_GRACE_DAYS} days after the Paid-Until Date`],
      ["Early-termination fee", `${EARLY_TERMINATION_MONTHS} months' Monthly Rent plus GST, per machine`],
      ["Payments by end users", "As agreed in writing between the parties"],
    ];
  }
  const plan = RENTAL_PLANS.find((x) => x.id === p.planId);
  const model = RENTAL_MODELS.find((m) => m.slug === p.modelSlug);
  const rent = plan?.price ?? 0;
  return [
    ["Booking reference", p.ref],
    ["Rental code(s)", p.rentalCodes.length ? p.rentalCodes.join(", ") : "Issued after confirmation"],
    ["Customer", [p.organisation, p.customerName].filter(Boolean).join(" / ")],
    ["Customer GSTIN", p.gstin || "Not provided"],
    ["Customer email / phone", `${p.email} / +91 ${p.phone}`],
    ["Site (installation address)", p.siteAddress],
    ["Equipment", `${p.qty} × Lyra ${model?.name ?? p.modelSlug} (${model?.tech ?? ""})`],
    ["Napkin capacity", `${plan?.capacity ?? "—"} napkins per fill (${plan?.name ?? ""} plan)`],
    ["Monthly Rent", `${rupees(rent)} per machine per month, plus GST (total ${rupees(rent * p.qty)} plus GST)`],
    [
      "Signing Amount option",
      p.upfront === "deposit"
        ? `Option A: refundable deposit ${rupees(RENTAL_DEPOSIT)} + first month's Rent ${rupees(rent)}, per machine, plus GST`
        : `Option B: ${RENTAL_ADVANCE_MONTHS} months' Rent in advance (${rupees(rent * RENTAL_ADVANCE_MONTHS)} per machine), plus GST`,
    ],
    ["Signing Amount paid", `${rupees(p.signingTotal)} including GST`],
    ["Recharge plans", recharges],
    ["Minimum Term", `${RENTAL_MIN_YEARS * 12} months from the Commencement Date (date of installation)`],
    ["Grace Period", `${RENTAL_GRACE_DAYS} days after the Paid-Until Date`],
    ["Early-termination fee", `${rupees(rent * EARLY_TERMINATION_MONTHS)} plus GST per machine (${EARLY_TERMINATION_MONTHS} months' Monthly Rent)`],
    ["Payments by end users", "As agreed in writing between the parties"],
  ];
}

/** One-line summary of what ticking the acceptance box means, shown at checkout. */
export const CONSENT_TEXT = `I have read, understood and agree to all terms of the Lyra ${AGREEMENT_TITLE} (${AGREEMENT_VERSION}), including Schedules A and B, and I am authorised to accept it on behalf of the Customer.`;
