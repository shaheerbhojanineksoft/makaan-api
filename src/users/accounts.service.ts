import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountType, DB_CONNECTION } from '../common/account-type';
import { UpdateAgencyProfileDto } from './dto/update-agency-profile.dto';
import { UpdateLawyerProfileDto } from './dto/update-lawyer-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import {
  AgencyAccount,
  AgencyAccountDocument,
} from './schemas/agency.schema';
import {
  LawyerAccount,
  LawyerAccountDocument,
} from './schemas/lawyer.schema';
import { UserAccount, UserAccountDocument } from './schemas/user.schema';

type AnyAccountDoc =
  | UserAccountDocument
  | LawyerAccountDocument
  | AgencyAccountDocument;

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(UserAccount.name, DB_CONNECTION.user)
    private readonly userModel: Model<UserAccountDocument>,
    @InjectModel(LawyerAccount.name, DB_CONNECTION.lawyer)
    private readonly lawyerModel: Model<LawyerAccountDocument>,
    @InjectModel(AgencyAccount.name, DB_CONNECTION.agency)
    private readonly agencyModel: Model<AgencyAccountDocument>,
  ) {}

  async findByEmail(type: AccountType, email: string) {
    const normalized = email.trim().toLowerCase();
    if (type === 'user') {
      return this.userModel.findOne({ email: normalized }).exec();
    }
    if (type === 'lawyer') {
      return this.lawyerModel.findOne({ email: normalized }).exec();
    }
    return this.agencyModel.findOne({ email: normalized }).exec();
  }

  async findById(type: AccountType, id: string) {
    if (type === 'user') {
      return this.userModel.findById(id).exec();
    }
    if (type === 'lawyer') {
      return this.lawyerModel.findById(id).exec();
    }
    return this.agencyModel.findById(id).exec();
  }

  createUserDefaults(email: string, fullname = '', profilePicture = '') {
    const now = new Date();
    return {
      profilePicture: profilePicture || '',
      fullname: fullname || '',
      email: email.trim().toLowerCase(),
      phoneNumber: '',
      isProfileCompleted: false,
      createdOn: now,
      modifiedOn: now,
    };
  }

  createLawyerDefaults(email: string, fullname = '', profilePicture = '') {
    const now = new Date();
    return {
      Bio: '',
      SpecialistIn: '',
      fullname: fullname || '',
      location: '',
      profilePicture: profilePicture || '',
      phonenumber: '',
      whatsappNumber: '',
      registered: false,
      email: email.trim().toLowerCase(),
      isProfileCompleted: false,
      createdOn: now,
      modifiedOn: now,
    };
  }

  createAgencyDefaults(email: string, fullname = '', profilePicture = '') {
    const now = new Date();
    return {
      name: fullname || '',
      agency: '',
      city: '',
      phone: '',
      whatsapp: '',
      email: email.trim().toLowerCase(),
      officeAddress: '',
      bio: '',
      profilePicture: profilePicture || '',
      coverImage: '',
      licenseNumber: '',
      responseTime: '',
      experienceYears: 0,
      teamSize: 0,
      specializations: [] as string[],
      areasServed: [] as string[],
      services: [] as string[],
      isProfileCompleted: false,
      isActive: true,
      createdOn: now,
      modifiedOn: now,
    };
  }

  async createAccount(
    type: AccountType,
    email: string,
    fullname = '',
    profilePicture = '',
  ) {
    if (type === 'user') {
      return this.userModel.create(
        this.createUserDefaults(email, fullname, profilePicture),
      );
    }
    if (type === 'lawyer') {
      return this.lawyerModel.create(
        this.createLawyerDefaults(email, fullname, profilePicture),
      );
    }
    return this.agencyModel.create(
      this.createAgencyDefaults(email, fullname, profilePicture),
    );
  }

  toSafeProfile(type: AccountType, doc: AnyAccountDoc) {
    const base = doc.toObject({ virtuals: false }) as unknown as Record<
      string,
      unknown
    >;
    const { createdOn: _createdOn, ...rest } = base;
    return { type, ...rest };
  }

  async getMe(accountId: string, type: AccountType) {
    const account = await this.findById(type, accountId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return this.toSafeProfile(type, account);
  }

  async updateUserProfile(accountId: string, type: AccountType, dto: UpdateUserProfileDto) {
    if (type !== 'user') {
      throw new ForbiddenException('Token type cannot access user profile');
    }
    const user = await this.userModel.findById(accountId).exec();
    if (!user) throw new NotFoundException('User not found');

    if (dto.name !== undefined) user.fullname = dto.name.trim();
    if (dto.email !== undefined) user.email = dto.email.trim().toLowerCase();
    if (dto.phone !== undefined) user.phoneNumber = dto.phone.trim();
    if (dto.profilePicture !== undefined) {
      user.profilePicture = dto.profilePicture.trim();
    }
    user.modifiedOn = new Date();
    await user.save();
    return this.toSafeProfile('user', user);
  }

  async updateLawyerProfile(
    accountId: string,
    type: AccountType,
    dto: UpdateLawyerProfileDto,
  ) {
    if (type !== 'lawyer') {
      throw new ForbiddenException('Token type cannot access lawyer profile');
    }
    const lawyer = await this.lawyerModel.findById(accountId).exec();
    if (!lawyer) throw new NotFoundException('Lawyer not found');

    if (dto.name !== undefined) lawyer.fullname = dto.name.trim();
    if (dto.city !== undefined) lawyer.location = dto.city.trim();
    if (dto.specialty !== undefined) lawyer.SpecialistIn = dto.specialty.trim();
    if (dto.bio !== undefined) lawyer.Bio = dto.bio.trim();
    if (dto.phone !== undefined) lawyer.phonenumber = dto.phone.trim();
    if (dto.whatsapp !== undefined) lawyer.whatsappNumber = dto.whatsapp.trim();
    if (dto.avatar !== undefined) lawyer.profilePicture = dto.avatar.trim();
    if (dto.registered !== undefined) lawyer.registered = Boolean(dto.registered);

    lawyer.modifiedOn = new Date();
    await lawyer.save();
    return this.toSafeProfile('lawyer', lawyer);
  }

  async updateAgencyProfile(
    accountId: string,
    type: AccountType,
    dto: UpdateAgencyProfileDto,
  ) {
    if (type !== 'agency') {
      throw new ForbiddenException('Token type cannot access agency profile');
    }
    const agency = await this.agencyModel.findById(accountId).exec();
    if (!agency) throw new NotFoundException('Agency not found');

    if (dto.name !== undefined) agency.name = dto.name.trim();
    if (dto.agency !== undefined) agency.agency = dto.agency.trim();
    if (dto.city !== undefined) agency.city = dto.city.trim();
    if (dto.phone !== undefined) agency.phone = dto.phone.trim();
    if (dto.whatsapp !== undefined) agency.whatsapp = dto.whatsapp.trim();
    if (dto.email !== undefined) agency.email = dto.email.trim().toLowerCase();
    if (dto.officeAddress !== undefined) {
      agency.officeAddress = dto.officeAddress.trim();
    }
    if (dto.bio !== undefined) agency.bio = dto.bio.trim();
    if (dto.profilePicture !== undefined) {
      agency.profilePicture = dto.profilePicture.trim();
    }
    if (dto.coverImage !== undefined) agency.coverImage = dto.coverImage.trim();
    if (dto.licenseNumber !== undefined) {
      agency.licenseNumber = dto.licenseNumber.trim();
    }
    if (dto.responseTime !== undefined) {
      agency.responseTime = dto.responseTime.trim();
    }
    if (dto.experienceYears !== undefined) {
      agency.experienceYears = Number(dto.experienceYears) || 0;
    }
    if (dto.teamSize !== undefined) {
      agency.teamSize = Number(dto.teamSize) || 0;
    }
    if (dto.specializations !== undefined) {
      agency.specializations = dto.specializations.map((item) => item.trim()).filter(Boolean);
    }
    if (dto.areasServed !== undefined) {
      agency.areasServed = dto.areasServed.map((item) => item.trim()).filter(Boolean);
    }
    if (dto.services !== undefined) {
      agency.services = dto.services.map((item) => item.trim()).filter(Boolean);
    }

    agency.modifiedOn = new Date();
    await agency.save();
    return this.toSafeProfile('agency', agency);
  }
}
