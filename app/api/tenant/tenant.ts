/*
 *
 *  * Copyright (c) 2023 - 2025 Orange Mali
 *  *
 *  * All rights reserved. This software is the proprietary information of Orange Mali.
 *  * Unauthorized copying, modification, or distribution of this code is prohibited.
 *  *
 *  * For inquiries or licensing, please contact Orange Mali at bakary.konate@orangemali.com.
 *  *
 *  * Description: This project is part of MTBP
 *  * It is intended for [describe the purpose of the software].
 *  *
 *  * @author konate081049
 *  * @version 1.0
 *
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getTenantDbConfig } from '@/lib/auth/tenantAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tenant } = JSON.parse(req.body);
  const tenantConfig = getTenantDbConfig(tenant);

  if (tenantConfig) {
    res.status(200).json({ domain: `${tenant}.muutaa.ai` });
  } else {
    res.status(400).json({ error: 'Invalid tenant' });
  }
}
