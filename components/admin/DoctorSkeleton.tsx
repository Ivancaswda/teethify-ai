import {Skeleton} from "@/components/ui/skeleton";

const DoctorSkeleton = () => {
    return (
        <div className="flex justify-between items-center p-4 border rounded-xl">
            <div className="flex gap-4 items-center">
                <Skeleton className="h-12 w-12 rounded-full" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-md" />
            </div>
        </div>
    );
};
export default DoctorSkeleton