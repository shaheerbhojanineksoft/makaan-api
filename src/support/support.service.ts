import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccountType, DB_CONNECTION } from '../common/account-type';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import {
  SupportRequest,
  type SupportRequestDocument,
} from './schemas/support-request.schema';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(SupportRequest.name, DB_CONNECTION.admin)
    private readonly supportModel: Model<SupportRequestDocument>,
  ) {}

  private toSafe(doc: SupportRequestDocument) {
    const raw = doc.toObject({ virtuals: false }) as SupportRequest & {
      _id: Types.ObjectId;
    };
    return {
      _id: String(raw._id),
      agencyId: String(raw.agencyId),
      subject: raw.subject,
      topic: raw.topic,
      message: raw.message,
      attachments: Array.isArray(raw.attachments) ? raw.attachments : [],
      phone: raw.phone,
      status: raw.status,
      response: raw.response || '',
      createdAt: raw.createdAt?.toISOString?.() || raw.createdAt,
      updatedAt: raw.updatedAt?.toISOString?.() || raw.updatedAt,
    };
  }

  async create(accountId: string, type: AccountType, dto: CreateSupportRequestDto) {
    if (type !== 'agency') {
      throw new ForbiddenException('Only agency accounts can create support requests');
    }

    const now = new Date();
    const agencyObjectId = new Types.ObjectId(accountId);
    const created = await this.supportModel.create({
      agencyId: agencyObjectId,
      subject: dto.subject.trim(),
      topic: dto.topic.trim(),
      message: dto.message.trim(),
      attachments: Array.isArray(dto.attachments)
        ? dto.attachments.map((item) => String(item || '').trim()).filter(Boolean).slice(0, 2)
        : [],
      phone: dto.phone.trim(),
      status: 'pending',
      response: '',
      createdAt: now,
      updatedAt: now,
    });

    return this.toSafe(created);
  }

  async listMine(accountId: string, type: AccountType) {
    if (type !== 'agency') {
      throw new ForbiddenException('Only agency accounts can view support requests');
    }

    const rows = await this.supportModel
      .find({ agencyId: new Types.ObjectId(accountId) })
      .sort({ createdAt: -1 })
      .exec();

    return rows.map((row) => this.toSafe(row));
  }

  async getMine(accountId: string, type: AccountType, requestId: string) {
    if (type !== 'agency') {
      throw new ForbiddenException('Only agency accounts can view support requests');
    }

    if (!Types.ObjectId.isValid(requestId)) {
      throw new NotFoundException('Support request not found');
    }

    const row = await this.supportModel
      .findOne({
        _id: new Types.ObjectId(requestId),
        agencyId: new Types.ObjectId(accountId),
      })
      .exec();
    if (!row) throw new NotFoundException('Support request not found');
    return this.toSafe(row);
  }
}
