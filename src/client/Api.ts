import * as $ from 'jquery';


//https://github.com/osu-cass/sb-components/blob/master/src/ApiModel.ts
export async function post<T>(url: string, params?: object) {
    return new Promise<T>((resolve, reject) => {
        $.ajax({
            url: url,
            dataType: "json",
            traditional: true,
            data: params,
            success: resolve,
            error: (xhr, status, err) => reject(new Error(err)),
            type: "POST"
        })
    });
}