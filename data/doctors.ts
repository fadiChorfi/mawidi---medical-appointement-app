export type CardDoctorsProps = {
  id: string;
  name: string;
  specialization: string | string[];
  imageUrl: undefined;
  location?: string;
  bio: string;
  reviews: {
    rating: number;
    comment: string;
    reviewerName: string;
  }[];
};

export const doctors: CardDoctorsProps[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    location: "New York, NY - 2.5 km",
    imageUrl: require("@/assets/images/doctor1.png"),
    bio: "Experienced cardiologist with 15 years of practice specializing in heart disease prevention and treatment.",
    reviews: [
      {
        rating: 5,
        comment: "Excellent doctor, very thorough and caring.",
        reviewerName: "John Smith",
      },
      {
        rating: 4.5,
        comment: "Great experience, highly recommend!",
        reviewerName: "Emily Davis",
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Dermatologist",
    location: "Brooklyn, NY - 3.1 km",
    imageUrl: require("@/assets/images/doctor2.png"),
    bio: "Board-certified dermatologist focusing on skin health, cosmetic procedures, and skin cancer treatment.",
    reviews: [
      {
        rating: 5,
        comment: "Very professional and knowledgeable.",
        reviewerName: "Maria Garcia",
      },
      {
        rating: 4.8,
        comment: "Helped me with my skin condition effectively.",
        reviewerName: "Robert Wilson",
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Amanda Williams",
    specialization: "Pediatrician",
    location: "Manhattan, NY - 1.8 km",
    imageUrl: require("@/assets/images/doctor3.png"),
    bio: "Compassionate pediatrician dedicated to children's health and development with 10+ years of experience.",
    reviews: [
      {
        rating: 5,
        comment: "My kids love her! Very patient and caring.",
        reviewerName: "Lisa Brown",
      },
      {
        rating: 5,
        comment: "Best pediatrician we've ever had.",
        reviewerName: "David Martinez",
      },
    ],
  },
  {
    id: "4",
    name: "Dr. James Anderson",
    specialization: "Neurologist",
    location: "Queens, NY - 4.2 km",
    imageUrl: require("@/assets/images/doctor4.png"),
    bio: "Specialist in neurological disorders with expertise in migraine treatment and epilepsy management.",
    reviews: [
      {
        rating: 4.7,
        comment: "Very thorough examination and clear explanations.",
        reviewerName: "Patricia Taylor",
      },
      {
        rating: 4.9,
        comment: "Helped me manage my condition effectively.",
        reviewerName: "Christopher Lee",
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Emma Thompson",
    specialization: "Dentist",
    location: "Bronx, NY - 3.7 km",
    imageUrl: require("@/assets/images/doctor5.png"),
    bio: "General dentist providing comprehensive dental care including preventive, restorative, and cosmetic dentistry.",
    reviews: [
      {
        rating: 5,
        comment: "Pain-free experience, highly skilled!",
        reviewerName: "Jessica White",
      },
      {
        rating: 4.8,
        comment: "Great at making patients feel comfortable.",
        reviewerName: "Matthew Harris",
      },
    ],
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    specialization: "Orthopedic",
    location: "Staten Island, NY - 5.3 km",
    imageUrl: require("@/assets/images/doctor6.png"),
    bio: "Orthopedic surgeon specializing in sports injuries, joint replacement, and trauma care.",
    reviews: [
      {
        rating: 5,
        comment: "Excellent surgeon, my knee is better than ever!",
        reviewerName: "Steven Clark",
      },
      {
        rating: 4.9,
        comment: "Very knowledgeable and caring doctor.",
        reviewerName: "Jennifer Lewis",
      },
    ],
  },
];

/* const specializations: string[] = [
  ...new Set(
    doctors.flatMap((doctor) =>
      Array.isArray(doctor.specialization)
        ? doctor.specialization
        : [doctor.specialization],
    ),
  ),
]; */
