import { blogPosts } from "@/data/posts";
import { cityGuides } from "@/data/cities";
import { hospitals } from "@/data/hospitals";
import { procedures } from "@/data/procedures";
import { caseStudies } from "@/data/case-studies";

export const getProcedureBySlug = (slug: string) =>
  procedures.find((item) => item.slug === slug);

export const getCityGuideBySlug = (slug: string) =>
  cityGuides.find((item) => item.slug === slug);

export const getHospitalBySlug = (slug: string) =>
  hospitals.find((item) => item.slug === slug);

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((item) => item.slug === slug);

export const getHospitalsBySlugs = (slugs: string[]) =>
  hospitals.filter((hospital) => slugs.includes(hospital.slug));

export const getPostsByCategory = (category: string) =>
  blogPosts.filter((post) => post.category === category);

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((item) => item.slug === slug);

export const getCaseStudiesByProcedureSlug = (procedureSlug: string) =>
  caseStudies.filter((item) => item.procedureSlug === procedureSlug);

export const getRelatedCaseForPost = (postSlug: string) => {
  const post = getBlogPostBySlug(postSlug);
  if (!post) return undefined;

  if (post.relatedCaseSlug) {
    const direct = getCaseStudyBySlug(post.relatedCaseSlug);
    if (direct) return direct;
  }

  if (post.relatedProcedureSlug) {
    return caseStudies.find((item) => item.procedureSlug === post.relatedProcedureSlug);
  }

  return undefined;
};
