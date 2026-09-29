import Loader from "@/components/ui/Loader";

export default async function Loading() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return <Loader />;
}
