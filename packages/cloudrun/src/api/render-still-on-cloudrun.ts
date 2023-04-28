import got from 'got';
import {validateCloudRunUrl} from '../shared/validate-cloudrun-url';
import {validateServeUrl} from '../shared/validate-serveurl';
import {getAuthClientForUrl} from './helpers/get-auth-client-for-url';

export type RenderStillOnCloudrunInput = {
	authenticatedRequest: boolean;
	cloudRunUrl: string;
	// serviceName?: string;
	serveUrl: string;
	composition: string;
	inputProps?: unknown;
	outputBucket: string;
	outputFile: string;
};

export type RenderStillOnCloudrunOutput = {
	publicUrl: string;
	cloudStorageUri: string;
	size: string;
	bucketName: string;
	renderId: string;
	status: string;
	errMessage: string;
	error: any;
};

/**
 * @description Triggers a render on a GCP Cloud Run service given a composition and a Cloud Run URL.
 * @see [Documentation](https://remotion.dev/docs/cloudrun/renderStillOnCloudrun)
 * @param params.authenticatedRequest If this is an authenticated request, .env file will be checked for GCP credentials
 * @param params.cloudRunUrl The url of the Cloud Run service that should be used
 * @param params.serviceName The name of the Cloud Run service that should be used
 * @param params.serveUrl The URL of the deployed project
 * @param params.composition The ID of the composition which should be rendered.
 * @param params.inputProps The input props that should be passed to the composition.
 * @param params.outputBucket The name of the GCP Storage Bucket that will store the rendered media output.
 * @param params.outputFolderPath The folder path of the GCP Storage Bucket that will store the rendered media output.
 * @param params.outName The file name of the rendered media output.
 * @returns {Promise<RenderStillOnCloudrunOutput>} See documentation for detailed structure
 */

export const renderStillOnCloudrun = async ({
	authenticatedRequest,
	cloudRunUrl,
	// serviceName,
	serveUrl,
	composition,
	inputProps,
	outputBucket,
	outputFile,
}: RenderStillOnCloudrunInput): Promise<RenderStillOnCloudrunOutput> => {
	validateServeUrl(serveUrl);
	validateCloudRunUrl(cloudRunUrl);

	// todo: allow serviceName to be passed in, and fetch the cloud run URL based on the name

	const data = {
		type: 'still',
		composition,
		serveUrl,
		inputProps,
		outputBucket,
		outputFile,
	};

	if (authenticatedRequest) {
		const client = await getAuthClientForUrl(cloudRunUrl);

		const authenticatedResponse = await client.request({
			url: cloudRunUrl,
			method: 'POST',
			data,
		});
		return authenticatedResponse.data as RenderStillOnCloudrunOutput;
	}

	const response: RenderStillOnCloudrunOutput = await got
		.post(cloudRunUrl, {json: data})
		.json();
	return response;
};
