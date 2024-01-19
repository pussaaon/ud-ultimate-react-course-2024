import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../../services/apiSettings";

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {
        isLoading: isUpdating,
        error,
        mutate: updateSetting,
    } = useMutation({
        mutationFn: updateSettingAPI,
        onSuccess: () => {
            toast.success("Update setting successfully.");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => {
            toast.error("Setting can't be updated ", err.message);
        },
    });

    return { isUpdating, error, updateSetting };
}

export default useUpdateSetting;
