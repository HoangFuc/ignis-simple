import { z } from '@hono/zod-openapi';
import {
  BindingKeys,
  BindingNamespaces,
  controller,
  ControllerFactory,
  get,
  HTTP,
  inject,
  jsonContent,
  jsonResponse,
  post,
} from '@venizia/ignis';

import type { TRouteContext } from '@venizia/ignis';

import { Product } from '@/models/entities/product.model';
import { ProductRepository } from '@/repositories/product.repository';

// --------------------------------------------------
const BASE_PATH = '/product';

// --------------------------------------------------
const dataSchema = z.object({
  id: z.union([z.string(), z.number(), z.bigint()]),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().int().positive(),
  createdBy: z.union([z.string(), z.number()]).nullable(),
  modifiedBy: z.union([z.string(), z.number()]).nullable(),
  createdAt: z.date(),
});

// --------------------------------------------------
const ConfigRoute = {
  get: {
    method: HTTP.Methods.GET,
    path: '/',
    responses: jsonResponse({
      description: 'Get product configuration',
      schema: z.object({
        data: z.array(dataSchema),
        method: z.string(),
      }),
    }),
  },

  create: {
    method: HTTP.Methods.POST,
    path: '/',
    request: {
      body: jsonContent({
        description: 'Create product configuration',
        schema: z.object({
          name: z.string(),
          price: z.number().int().positive(),
          code: z.string(),
        }),
      }),
    },
    responses: jsonResponse({
      description: 'Product created successfully',
      schema: z.object({ message: z.string() }),
    }),
  },
} as const;

// --------------------------------------------------
const _Controller = ControllerFactory.defineCrudController({
  repository: { name: ProductRepository.name },
  controller: {
    name: 'ProductController',
    basePath: BASE_PATH,
  },
  entity: () => Product,
});

@controller({ path: BASE_PATH })
export class ProductController extends _Controller {
  constructor(
    @inject({
      key: BindingKeys.build({
        namespace: BindingNamespaces.REPOSITORY,
        key: ProductRepository.name,
      }),
    })
    repository: ProductRepository,
  ) {
    super(repository);
  }

  @get({ configs: ConfigRoute.get })
  async getAllProduct(c: TRouteContext<typeof ConfigRoute.get>) {
    const products = await this.repository.find({ filter: {} });

    return c.json({ data: products, method: c.req.method }, HTTP.ResultCodes.RS_2.Ok);
  }

  @post({ configs: ConfigRoute.create })
  async createProduct(c: TRouteContext<typeof ConfigRoute.create>) {
    const { name, price, code } = c.req.valid('json');
    const newProducts = {
      code,
      name,
      price,
    };
    await this.repository.create({ data: newProducts });

    return c.json({ message: 'Create success' }, HTTP.ResultCodes.RS_2.Ok);
  }
}
