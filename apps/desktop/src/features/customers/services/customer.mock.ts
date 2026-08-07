import { getNextCode } from "@/utils/codeGenerator/getNextCode";
import type { Customer } from "../types/customer.types";


const createAddress = (
  addressLine1: string,
  addressLine2: string,
  city: string,
  state: string,
  country: string,
  postalCode: string
) => ({
  billingAddressLine1: addressLine1,
  billingAddressLine2: addressLine2,
  billingCity: city,
  billingState: state,
  billingCountry: country,
  billingPostalCode: postalCode,

  shippingAddressLine1: addressLine1,
  shippingAddressLine2: addressLine2,
  shippingCity: city,
  shippingState: state,
  shippingCountry: country,
  shippingPostalCode: postalCode,
});



export const customers: Customer[] = [

  {
    id: "1",
    customerCode: "CUST-0001",
    companyName: "ABC Technologies Pvt Ltd",
    customerType: "BUSINESS",
    contactPerson: "Rahul Sharma",
    email: "rahul@abctech.com",
    phone: "+91 9876543210",
    gstNumber: "27ABCDE1234F1Z5",

    ...createAddress(
      "Flat 302, Sai Residency",
      "Baner Road",
      "Pune",
      "Maharashtra",
      "India",
      "411045"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-01",
    updatedAt: "2026-07-01",
  },


  {
    id: "2",
    customerCode: "CUST-0002",
    companyName: "NextGen Solutions",
    customerType: "BUSINESS",
    contactPerson: "Priya Patel",
    email: "priya@nextgen.com",
    phone: "+91 9988776655",
    gstNumber: "24XYZAB5678C1Z2",

    ...createAddress(
      "Office No. 405, Shivalik Plaza",
      "SG Highway",
      "Ahmedabad",
      "Gujarat",
      "India",
      "380015"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-03",
    updatedAt: "2026-07-03",
  },


  {
    id: "3",
    customerCode: "CUST-0003",
    companyName: "Blue Ocean Infotech",
    customerType: "BUSINESS",
    contactPerson: "Amit Verma",
    email: "amit@blueocean.com",
    phone: "+91 9123456780",
    gstNumber: "29AAAPL1234B1Z8",

    ...createAddress(
      "Tower B, 7th Floor",
      "Whitefield IT Park",
      "Bengaluru",
      "Karnataka",
      "India",
      "560066"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-04",
    updatedAt: "2026-07-04",
  },


  {
    id: "4",
    customerCode: "CUST-0004",
    companyName: "Skyline Enterprises",
    customerType: "BUSINESS",
    contactPerson: "Sneha Joshi",
    email: "sneha@skyline.com",
    phone: "+91 9012345678",
    gstNumber: "27PQRSX4567L1Z4",

    ...createAddress(
      "Shop No. 12, City Point",
      "FC Road",
      "Pune",
      "Maharashtra",
      "India",
      "411004"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-05",
    updatedAt: "2026-07-05",
  },


  {
    id: "5",
    customerCode: "CUST-0005",
    companyName: "Zenith Electronics",
    customerType: "BUSINESS",
    contactPerson: "Karan Mehta",
    email: "karan@zenith.com",
    phone: "+91 9988123456",
    gstNumber: "07LMNOP9876R1Z1",

    ...createAddress(
      "Block C, Business Centre",
      "Connaught Place",
      "New Delhi",
      "Delhi",
      "India",
      "110001"
    ),

    notes: "",
    isActive: false,
    createdAt: "2026-07-06",
    updatedAt: "2026-07-06",
  },
    {
    id: "6",
    customerCode: "CUST-0006",
    companyName: "Prime Logistics",
    customerType: "BUSINESS",
    contactPerson: "Vikram Singh",
    email: "vikram@prime.com",
    phone: "+91 9876501234",
    gstNumber: "08JKLMN4567Q1Z9",

    ...createAddress(
      "Warehouse No. 8",
      "MI Road",
      "Jaipur",
      "Rajasthan",
      "India",
      "302001"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-07",
    updatedAt: "2026-07-07",
  },


  {
    id: "7",
    customerCode: "CUST-0007",
    companyName: "TechNova Systems",
    customerType: "BUSINESS",
    contactPerson: "Neha Kapoor",
    email: "neha@technova.com",
    phone: "+91 9765432101",
    gstNumber: "09ABCDE5678K1Z3",

    ...createAddress(
      "Office 201, Cyber Tower",
      "Hazratganj",
      "Lucknow",
      "Uttar Pradesh",
      "India",
      "226001"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-08",
    updatedAt: "2026-07-08",
  },


  {
    id: "8",
    customerCode: "CUST-0008",
    companyName: "GreenLeaf Agro",
    customerType: "BUSINESS",
    contactPerson: "Arjun Reddy",
    email: "arjun@greenleaf.com",
    phone: "+91 9345678901",
    gstNumber: "36QRSTU1234A1Z7",

    ...createAddress(
      "Plot No. 45",
      "Banjara Hills",
      "Hyderabad",
      "Telangana",
      "India",
      "500034"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-09",
    updatedAt: "2026-07-09",
  },


  {
    id: "9",
    customerCode: "CUST-0009",
    companyName: "Pixel Studios",
    customerType: "BUSINESS",
    contactPerson: "Rohan Das",
    email: "rohan@pixel.com",
    phone: "+91 9654321870",
    gstNumber: "19ABCDE5678L1Z2",

    ...createAddress(
      "Creative Hub, 5th Floor",
      "Salt Lake Sector V",
      "Kolkata",
      "West Bengal",
      "India",
      "700091"
    ),

    notes: "",
    isActive: false,
    createdAt: "2026-07-10",
    updatedAt: "2026-07-10",
  },


  {
    id: "10",
    customerCode: "CUST-0010",
    companyName: "Alpha Manufacturing",
    customerType: "BUSINESS",
    contactPerson: "Manish Gupta",
    email: "manish@alpha.com",
    phone: "+91 9789012345",
    gstNumber: "33ABCDE7890D1Z6",

    ...createAddress(
      "Industrial Estate, Block A",
      "Guindy",
      "Chennai",
      "Tamil Nadu",
      "India",
      "600032"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-11",
    updatedAt: "2026-07-11",
  },


  {
    id: "11",
    customerCode: "CUST-0011",
    companyName: "Bright Vision Solutions",
    customerType: "BUSINESS",
    contactPerson: "Anjali Nair",
    email: "anjali@brightvision.com",
    phone: "+91 9123987654",
    gstNumber: "32ABCDE4567E1Z1",

    ...createAddress(
      "Office No. 304, Prestige Tower",
      "MG Road",
      "Kochi",
      "Kerala",
      "India",
      "682016"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-12",
    updatedAt: "2026-07-12",
  },


  {
    id: "12",
    customerCode: "CUST-0012",
    companyName: "Fusion Networks",
    customerType: "BUSINESS",
    contactPerson: "Deepak Yadav",
    email: "deepak@fusion.com",
    phone: "+91 9988456123",
    gstNumber: "10ABCDE9876T1Z5",

    ...createAddress(
      "2nd Floor, Fusion Plaza",
      "Boring Road",
      "Patna",
      "Bihar",
      "India",
      "800001"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-13",
    updatedAt: "2026-07-13",
  },


  {
    id: "13",
    customerCode: "CUST-0013",
    companyName: "Vertex Solutions",
    customerType: "BUSINESS",
    contactPerson: "Nitin Kulkarni",
    email: "nitin@vertex.com",
    phone: "+91 9765123489",
    gstNumber: "27VERTX1234A1Z9",

    ...createAddress(
      "Vertex Business Park",
      "Shivaji Nagar",
      "Pune",
      "Maharashtra",
      "India",
      "411005"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-14",
    updatedAt: "2026-07-14",
  },


  {
    id: "14",
    customerCode: "CUST-0014",
    companyName: "Crystal IT Services",
    customerType: "BUSINESS",
    contactPerson: "Pooja Shah",
    email: "pooja@crystalit.com",
    phone: "+91 9898123456",
    gstNumber: "24CRYST1234M1Z8",

    ...createAddress(
      "Crystal Business Centre",
      "Navrangpura",
      "Ahmedabad",
      "Gujarat",
      "India",
      "380009"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-15",
    updatedAt: "2026-07-15",
  },
    {
    id: "15",
    customerCode: "CUST-0015",
    companyName: "Infinity Healthcare",
    customerType: "BUSINESS",
    contactPerson: "Saurabh Jain",
    email: "saurabh@infinity.com",
    phone: "+91 9911223344",
    gstNumber: "23HEALT5678P1Z4",

    ...createAddress(
      "Infinity Medical Complex",
      "Vijay Nagar",
      "Indore",
      "Madhya Pradesh",
      "India",
      "452010"
    ),

    notes: "",
    isActive: false,
    createdAt: "2026-07-16",
    updatedAt: "2026-07-16",
  },


  {
    id: "16",
    customerCode: "CUST-0016",
    companyName: "Orbit Tech",
    customerType: "BUSINESS",
    contactPerson: "Harsh Agrawal",
    email: "harsh@orbit.com",
    phone: "+91 9845012345",
    gstNumber: "29ORBIT5678A1Z2",

    ...createAddress(
      "Orbit Tech Park, Tower C",
      "Electronic City",
      "Bengaluru",
      "Karnataka",
      "India",
      "560100"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-17",
    updatedAt: "2026-07-17",
  },


  {
    id: "17",
    customerCode: "CUST-0017",
    companyName: "Metro Developers",
    customerType: "BUSINESS",
    contactPerson: "Ritika Sinha",
    email: "ritika@metro.com",
    phone: "+91 9955332211",
    gstNumber: "20METRO1234Q1Z6",

    ...createAddress(
      "Metro Corporate House",
      "Main Road",
      "Ranchi",
      "Jharkhand",
      "India",
      "834001"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-18",
    updatedAt: "2026-07-18",
  },


  {
    id: "18",
    customerCode: "CUST-0018",
    companyName: "Silverline Textiles",
    customerType: "BUSINESS",
    contactPerson: "Meera Iyer",
    email: "meera@silverline.com",
    phone: "+91 9445566778",
    gstNumber: "33SILVR5678R1Z3",

    ...createAddress(
      "Silverline Trade Centre",
      "T Nagar",
      "Chennai",
      "Tamil Nadu",
      "India",
      "600017"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-19",
    updatedAt: "2026-07-19",
  },


  {
    id: "19",
    customerCode: "CUST-0019",
    companyName: "Nova Energy",
    customerType: "BUSINESS",
    contactPerson: "Aditya Rao",
    email: "aditya@novaenergy.com",
    phone: "+91 9870011223",
    gstNumber: "37NOVAE1234B1Z1",

    ...createAddress(
      "Nova Business Tower",
      "MVP Colony",
      "Visakhapatnam",
      "Andhra Pradesh",
      "India",
      "530017"
    ),

    notes: "",
    isActive: false,
    createdAt: "2026-07-20",
    updatedAt: "2026-07-20",
  },


  {
    id: "20",
    customerCode: "CUST-0020",
    companyName: "Pioneer Automation",
    customerType: "BUSINESS",
    contactPerson: "Akash Deshmukh",
    email: "akash@pioneer.com",
    phone: "+91 9823012345",
    gstNumber: "27PIONE1234X1Z8",

    ...createAddress(
      "Pioneer Industrial Hub",
      "Hinjewadi Phase 1",
      "Pune",
      "Maharashtra",
      "India",
      "411057"
    ),

    notes: "",
    isActive: true,
    createdAt: "2026-07-21",
    updatedAt: "2026-07-21",
  },

];



getNextCode(
  customers,
  "CUST",
  "customerCode"
);