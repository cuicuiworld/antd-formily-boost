import { Form } from '@formily/core';
import useQuery, { UseQueryRequest } from './useQuery';
import useRequest from './useRequest';

export type UseQueryDetailProps = {
    detail: any;
};

export type UseQueryDetailOptions = {
    add?: string;
    mod?: string;
    del?: string;
    queryRequest?: (config: UseQueryRequest) => void;
};

// useQueryDetai的工作也很少，包括
// * 加载页面时自动拉取数据
// * 拼接默认对应的add，mod，del的接口
function useQueryDetail(
    getUrl: string,
    id: number | string,
    finishUpdateCallback: () => void,
    form: Form<UseQueryDetailProps>,
    options?: UseQueryDetailOptions,
) {
    let queryInfo = useQuery(async (axios) => {
        if (!id) {
            return;
        }
        if (options?.queryRequest) {
            await options?.queryRequest(axios);
        } else {
            let result = await request({
                method: 'GET',
                url: getUrl,
                data: {
                    id: id,
                },
            });

            if (result.status == 'fail') {
                return;
            }
            form.values.detail = result.data;
        }
    });
    const request = useRequest();
    const add = async () => {
        let result = await request({
            method: 'POST',
            url: options?.add,
            data: {
                ...form.values.detail,
            },
        });
        if (result.status == 'fail') {
            return;
        }
        form.values.detail = {};
        finishUpdateCallback();
    };
    const mod = async () => {
        let result = await request({
            method: 'POST',
            url: options?.mod,
            data: {
                id: id,
                ...form.values.detail,
            },
        });
        if (result.status == 'fail') {
            return;
        }
        finishUpdateCallback();
    };
    const del = async () => {
        let result = await request({
            method: 'POST',
            url: options?.del,
            data: {
                id: id,
            },
        });
        if (result.status == 'fail') {
            return;
        }
        finishUpdateCallback();
    };
    const save = async () => {
        if (id) {
            mod();
        } else {
            add();
        }
    };
    return {
        ...queryInfo,
        add,
        mod,
        del,
        save,
        id,
    };
}

export default useQueryDetail;
