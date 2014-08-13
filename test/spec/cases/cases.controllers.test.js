'use strict';

describe('Case Controllers', function() {

	var mockRecommendationsService;
	var mockSearchResultsService;
	var mockStrataService;
    var mockStrataDataService;
    var mockCaseService;
    var mockAttachmentsService;
	var mockScope;
	var q;

	beforeEach(angular.mock.module('RedhatAccess.cases'));
	beforeEach(angular.mock.module('RedhatAccess.mock'));

	beforeEach(inject(function ($injector, $rootScope, $q) {
		q = $q;
		mockStrataService = $injector.get('strataService');
		mockCaseService = $injector.get('MockCaseService');
		mockRecommendationsService = $injector.get('MockRecommendationsService');
		mockSearchResultsService = $injector.get('MockSearchResultsService');
		mockStrataDataService = $injector.get('MockStrataDataService');
		mockAttachmentsService = $injector.get('MockAttachmentsService');
		mockScope = $rootScope.$new();					
			
	}));

	//Suite for DetailsSection
	describe('DetailsSection', function() {

		it('should have a function for initializing the selects of case types,product,status,severity and group', inject(function ($controller) {

	        $controller('DetailsSection', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	            strataService: mockStrataService
	        });

	        expect(mockScope.init).toBeDefined();
	        mockScope.init();	        
	        spyOn(mockStrataService.values.cases, 'types').andCallThrough();
	        spyOn(mockStrataService.groups, 'list').andCallThrough();
	        spyOn(mockStrataService.values.cases, 'status').andCallThrough();
	        spyOn(mockStrataService.values.cases, 'severity').andCallThrough();
	        spyOn(mockStrataService.products, 'list').andCallThrough();	        
	        mockScope.$root.$digest();
	        expect(mockScope.caseTypes).toEqual(mockStrataDataService.mockTypes);	        
	        expect(mockScope.groups).toEqual(mockStrataDataService.mockGroups);
	        expect(mockScope.statuses).toEqual(mockStrataDataService.mockStatuses);
	        expect(mockCaseService.severities).toEqual(mockStrataDataService.mockSeverities);

  		}));

		it('should have a function for initializing the selects rejected', inject(function ($controller) {

	        $controller('DetailsSection', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	            strataService: mockStrataService
	        });

	        expect(mockScope.init).toBeDefined();
	        mockStrataService.rejectCalls();
	        	        
	        spyOn(mockStrataService.values.cases, 'types').andCallThrough();
	        spyOn(mockStrataService.groups, 'list').andCallThrough();
	        spyOn(mockStrataService.values.cases, 'status').andCallThrough();
	        spyOn(mockStrataService.values.cases, 'severity').andCallThrough();
	        spyOn(mockStrataService.products, 'list').andCallThrough();	
	        mockScope.init();        
	        mockScope.$root.$digest();
	        expect(mockScope.caseTypes).toBeUndefined();        
	        expect(mockScope.groups).toBeUndefined();
	        expect(mockScope.statuses).toBeUndefined();	        
	        expect(mockCaseService.severities).toEqual([]);

  		}));

		it('should have a function for updating case details resolved', inject(function ($controller) {

	        $controller('DetailsSection', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	            strataService: mockStrataService
	        });

	        mockScope.caseDetails = {
	          $valid: true,
	          $setPristine: function() {}
	        };

	        mockCaseService.kase.case_number = '1234';
	        mockCaseService.kase.type = 'bug';
	        mockCaseService.kase.severity = 'high';
	        mockCaseService.kase.status = 'open';
	        mockCaseService.kase.alternate_id = '12345';
	        mockCaseService.kase.product = 'Red Hat Enterprise Linux';
	        mockCaseService.kase.version = '6.0';
	        mockCaseService.kase.summary = 'Test Summary';
	        mockCaseService.kase.group = {
	          name: 'Test Group',
	          number: '123456'
	        };
	        mockCaseService.kase.fts = true;
	        mockCaseService.kase.contact_info24_x7 = 'test@test.com';
	        expect(mockScope.updateCase).toBeDefined();
	        mockScope.updateCase();
	        spyOn(mockStrataService.cases, 'put').andCallThrough();
	        mockScope.$root.$digest();
	        expect(mockScope.updatingDetails).toBe(false);
        
	  	}));

		it('should have a function to get Product Versions resolved', inject(function ($controller) {

	        $controller('DetailsSection', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	            strataService: mockStrataService
	        });
	        
	        mockCaseService.kase.product = {
	          name: 'Red Hat Enterprise Linux',
	          code: '123456'
	        };
	       
	        expect(mockScope.getProductVersions).toBeDefined();
	        mockScope.getProductVersions();
	        spyOn(mockStrataService.products, 'versions').andCallThrough();
	        mockScope.$root.$digest();
	        expect(mockCaseService.versions).toEqual(mockStrataDataService.mockVersions);   
	        
	  	}));

	  	it('should have a function to get Product Versions rejected', inject(function ($controller) {

	        $controller('DetailsSection', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	            strataService: mockStrataService
	        });

	        mockCaseService.kase.product = {
	          name: 'Red Hat Enterprise Linux',
	          code: '123456'
	        };
	       
	        expect(mockScope.getProductVersions).toBeDefined();
	        mockStrataService.rejectCalls();
	        spyOn(mockStrataService.products, 'versions').andCallThrough();
	        mockScope.getProductVersions();        
	        mockScope.$root.$digest();
	        expect(mockCaseService.versions).toEqual([]);   
	        
	  	}));
	});

	//Suite for AddCommentSection
	describe('AddCommentSection', function() {

		it('should have a function for adding comments to case resolved', inject(function ($controller) {

	        $controller('AddCommentSection', {
	          	$scope: mockScope,
	          	CaseService: mockCaseService,
	          	strataService: mockStrataService
	        });

	      	mockCaseService.kase.case_number = '1234';
	      	mockCaseService.commentText = 'test comment';
	      	mockScope.saveDraftPromise = '3'
	      	mockCaseService.kase.status = {
	          name: 'Closed'
	        };
	        expect(mockScope.addComment).toBeDefined();
	      	mockScope.addComment();
	      	spyOn(mockStrataService.cases.comments, 'post').andCallThrough();  
	     	mockScope.$root.$digest();  
	      	expect(mockCaseService.kase.status.name).toEqual("Waiting on Red Hat");
	  
	  	}));

	  	it('should have a function for adding comments to case rejected', inject(function ($controller) {

	        $controller('AddCommentSection', {
	          	$scope: mockScope,
	          	CaseService: mockCaseService,
	          	strataService: mockStrataService
	        });

	      	mockCaseService.kase.case_number = '1234';
	      	mockCaseService.commentText = 'test comment';
	      	mockScope.saveDraftPromise = '3'
	      	mockCaseService.kase.status = {
	          name: 'Closed'
	        };
	      	expect(mockScope.addComment).toBeDefined();
	      	mockStrataService.rejectCalls();
	      	spyOn(mockStrataService.cases.comments, 'post').andCallThrough();
	      	mockScope.addComment();	      	  
	     	mockScope.$root.$digest();  
	      	expect(mockCaseService.kase.status.name).toEqual("Closed");
	      	expect(mockScope.addingComment).toBe(false);
	  
	  	}));

	  	it('should have a function for adding draft comments to case', inject(function ($controller) {

		    $controller('AddCommentSection', {
		        $scope: mockScope,
		        CaseService: mockCaseService,
		        strataService: mockStrataService
		    });

		    mockCaseService.kase.case_number = '1234';
		    mockCaseService.commentText = 'test comment';
		    mockScope.saveDraftPromise = '3'
		    mockCaseService.kase.status = {
	          name: 'Closed'
	        };
		    mockCaseService.draftComment = {};
		    mockCaseService.draftComment.id = '1111';
		    expect(mockScope.addComment).toBeDefined();
		    mockScope.addComment();      
		    spyOn(mockStrataService.cases.comments, 'put').andCallThrough();  
		    mockScope.$root.$digest(); 
		    expect(mockCaseService.kase.status.name).toEqual('Waiting on Red Hat');       
	        
	  	}));

	  	it('should have a function for saving non draft comments', inject(function ($controller) {

		    $controller('AddCommentSection', {
		        $scope: mockScope,
		        CaseService: mockCaseService,
		        strataService: mockStrataService
		    });

		    mockCaseService.kase.case_number = '1234';
		    mockCaseService.commentText = 'test comment';
		    expect(mockScope.saveDraft).toBeDefined();
		    mockScope.saveDraft();      
		    spyOn(mockStrataService.cases.comments, 'post').andCallThrough();  
		    mockScope.$root.$digest(); 
		    expect(mockScope.draftSaved).toBe(true);
		    expect(mockCaseService.draftComment.case_number).toEqual('1234');       
		    
		}));

		it('should have a function for saving draft comments', inject(function ($controller) {

		    $controller('AddCommentSection', {
		        $scope: mockScope,
		        CaseService: mockCaseService,
		        strataService: mockStrataService
		    });

		    mockCaseService.kase.case_number = '1234';
		    mockCaseService.commentText = 'test comment';
		    mockCaseService.draftComment = {};
		    expect(mockScope.saveDraft).toBeDefined();
		    mockScope.saveDraft();      
		    spyOn(mockStrataService.cases.comments, 'put').andCallThrough();  
		    mockScope.$root.$digest(); 
		    expect(mockScope.draftSaved).toBe(true);
		    expect(mockCaseService.draftComment.text).toEqual('test comment');       
		    
		}));

		it('should have a function for saving draft comments rejected', inject(function ($controller) {

		    $controller('AddCommentSection', {
		        $scope: mockScope,
		        CaseService: mockCaseService,
		        strataService: mockStrataService
		    });

		    mockCaseService.kase.case_number = '1234';
		    mockCaseService.commentText = 'test comment';
		    mockCaseService.draftComment = {};
		    expect(mockScope.saveDraft).toBeDefined();
		    mockStrataService.rejectCalls();
		    spyOn(mockStrataService.cases.comments, 'put').andCallThrough(); 
		    mockScope.saveDraft();		     
		    mockScope.$root.$digest(); 
		    expect(mockScope.savingDraft).toBe(false);      
		    
		}));

		it('should have a function for on New Comment Keypress', inject(function ($controller) {

	        $controller('AddCommentSection', {
	          	$scope: mockScope,
	          	CaseService: mockCaseService,
	          	strataService: mockStrataService
	        });

	        mockScope.addingComment = false;
	        mockCaseService.commentText = 'test comment';
	        expect(mockScope.onNewCommentKeypress).toBeDefined();
	        mockScope.onNewCommentKeypress();           
	        
	  	}));

	});

	//Suite for New
	describe('New', function() {

		it('should have a function for fetching recommendations resolved', inject(function ($controller) {

	        $controller('New', {
	            $scope: mockScope,
	            RecommendationsService: mockRecommendationsService,
	            SearchResultsService: mockSearchResultsService,
	            strataService: mockStrataService
	        });

	        mockScope.NEW_CASE_CONFIG.showRecommendations = true;
	        expect(mockScope.getRecommendations).toBeDefined();
	        mockScope.getRecommendations();  
	        spyOn(mockRecommendationsService, 'populateRecommendations').andCallThrough();
	        mockScope.$root.$digest();          
	        expect(mockSearchResultsService.results).toEqual(mockStrataDataService.mockSolutions); 

  		}));

  		it('should have a function for getting Product Versions resolved', inject(function ($controller) {

	        $controller('New', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	            RecommendationsService: mockRecommendationsService,
	            SearchResultsService: mockSearchResultsService,
	            strataService: mockStrataService,
	            NEW_DEFAULTS: mockStrataDataService.value
	        });

	        var product = {
	          name: 'Red Hat Enterprise Linux',
	          code: '123456'
	        };

	        expect(mockScope.getProductVersions).toBeDefined();
	        mockScope.getProductVersions(product);
	        spyOn(mockStrataService.products, 'versions').andCallThrough();
	        mockScope.$root.$digest();
	        expect(mockCaseService.kase.version).toEqual(mockStrataDataService.value.version);

  		}));

  		it('should have a function for submitting case', inject(function ($controller) {

	        $controller('New', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	            RecommendationsService: mockRecommendationsService,
	            SearchResultsService: mockSearchResultsService,
	            strataService: mockStrataService,
	            NEW_DEFAULTS: mockStrataDataService.value
	        });

			mockCaseService.kase.version = '6.0';
	        mockCaseService.kase.summary = 'Test Summary';
	        mockCaseService.kase.description = 'Test Description';
	        mockCaseService.kase.severity = {
	        	name: 'high',
	        	value: '1'
	        };
	        mockCaseService.kase.product = {
	          name: 'Red Hat Enterprise Linux',
	          code: '123456'
	        };
	        mockCaseService.group = 'open';
	        mockCaseService.entitlement = 'premium';
	        mockCaseService.fts = true;
	        mockCaseService.fts_contact = 'testUser@test.com';
	        mockCaseService.owner = 'testUser';
	        mockCaseService.kase.account = {
	        	name: 'testAccount',
	        	number: '12345'
	        };	        

	        expect(mockScope.doSubmit).toBeDefined();
	        mockScope.doSubmit();
	        spyOn(mockStrataService.cases, 'post').andCallThrough();
	        mockScope.$root.$digest();
	        expect(mockScope.submittingCase).toBe(false);

  		}));

		it('should have a function for initializing the drop downs of product,severity and group', inject(function ($controller) {

	        $controller('New', {
	            $scope: mockScope,
	            CaseService: mockCaseService,	            
	            strataService: mockStrataService,
	            NEW_DEFAULTS: mockStrataDataService.value
	        });

	        expect(mockScope.initSelects).toBeDefined();
	        mockScope.initSelects();
	        spyOn(mockStrataService.products, 'list').andCallThrough();
	        spyOn(mockStrataService.values.cases, 'severity').andCallThrough();
	        spyOn(mockStrataService.groups, 'list').andCallThrough();
	        mockScope.$root.$digest();
	        expect(mockScope.products).toEqual(mockStrataDataService.mockProducts);	        
	        expect(mockCaseService.kase.product.name).toEqual(mockStrataDataService.value.product);
	        expect(mockCaseService.severities).toEqual(mockStrataDataService.mockSeverities);	        
	        expect(mockCaseService.groups).toEqual(mockStrataDataService.mockGroups);	        
	        expect(mockCaseService.kase.group).toEqual(mockStrataDataService.mockGroups[1]);

  		}));

		it('should have a function for initializing the drop downs rejected', inject(function ($controller) {

	        $controller('New', {
	            $scope: mockScope,
	            CaseService: mockCaseService,	            
	            strataService: mockStrataService,
	            NEW_DEFAULTS: mockStrataDataService.value
	        });

	        expect(mockScope.initSelects).toBeDefined();
	        mockStrataService.rejectCalls();
	        spyOn(mockStrataService.products, 'list').andCallThrough();
	        spyOn(mockStrataService.values.cases, 'severity').andCallThrough();
	        spyOn(mockStrataService.groups, 'list').andCallThrough();
	        mockScope.initSelects();	       
	        mockScope.$root.$digest();
	        expect(mockScope.products).toBeUndefined();		        
	        expect(mockCaseService.kase.product).toBeUndefined();
	        expect(mockCaseService.severities).toEqual([]);	        
	        expect(mockCaseService.groups).toEqual([]);	        
	        expect(mockCaseService.kase.group).toBeUndefined();

  		}));

	});	

	//Suite for RecommendationsSection
	describe('RecommendationsSection', function() {

		it('should have a function to select Recommendations Page', inject(function ($controller) {

	        $controller('RecommendationsSection', {
	            $scope: mockScope,
	            RecommendationsService: mockRecommendationsService,
	            CaseService: mockCaseService,	            
	            strataService: mockStrataService
	        });

	        expect(mockScope.selectRecommendationsPage).toBeDefined();	
	        mockRecommendationsService.pinnedRecommendations = mockStrataDataService.mockRecommendations;
	        mockRecommendationsService.recommendations = mockStrataDataService.mockRecommendations;
	        mockRecommendationsService.handPickedRecommendations = mockStrataDataService.mockRecommendations;
	        mockScope.selectRecommendationsPage();
	        expect(mockScope.recommendationsOnScreen).toEqual([]);	        

  		}));

  		it('should have a function to pin Recommendations', inject(function ($controller) {

	        $controller('RecommendationsSection', {
	            $scope: mockScope,
	            RecommendationsService: mockRecommendationsService,
	            CaseService: mockCaseService,	            
	            strataService: mockStrataService
	        });

	        expect(mockScope.pinRecommendation).toBeDefined();	
	        mockCaseService.kase.case_number = '1234'; 
	        mockRecommendationsService.pinnedRecommendations = mockStrataDataService.mockRecommendations; 	        
	        mockScope.pinRecommendation(mockStrataDataService.mockSolutionNotPinned,undefined,undefined);
	        spyOn(mockStrataService.cases, 'put').andCallThrough();
	        mockScope.$root.$digest();
	        expect(mockScope.currentRecPin.pinned).toBe(true);  
	        expect(mockScope.currentRecPin.pinning).toBe(false);
	        expect(mockRecommendationsService.pinnedRecommendations.length).toBe(3);

  		}));

  		it('should have a function to unpin Recommendations', inject(function ($controller) {

	        $controller('RecommendationsSection', {
	            $scope: mockScope,
	            RecommendationsService: mockRecommendationsService,
	            CaseService: mockCaseService,	            
	            strataService: mockStrataService
	        });

	        expect(mockScope.pinRecommendation).toBeDefined();	
	        mockCaseService.kase.case_number = '1234'; 
	        mockRecommendationsService.pinnedRecommendations = mockStrataDataService.mockRecommendations;
	        mockScope.pinRecommendation(mockStrataDataService.mockRecommendationPinned,undefined,undefined);
	        spyOn(mockStrataService.cases, 'put').andCallThrough();
	        mockScope.$root.$digest();
	        expect(mockScope.currentRecPin.pinned).toBe(false);
	        expect(mockScope.currentRecPin.pinning).toBe(false);
	        expect(mockRecommendationsService.pinnedRecommendations.length).toBe(1);      

  		}));

  		it('should have a function to pin Recommendations rejected', inject(function ($controller) {

	        $controller('RecommendationsSection', {
	            $scope: mockScope,
	            RecommendationsService: mockRecommendationsService,
	            CaseService: mockCaseService,	            
	            strataService: mockStrataService
	        });

	        expect(mockScope.pinRecommendation).toBeDefined();	
	        mockCaseService.kase.case_number = '1234';
	        mockStrataService.rejectCalls();        
	        spyOn(mockStrataService.cases, 'put').andCallThrough();
	        mockScope.pinRecommendation(mockStrataDataService.mockSolutionNotPinned,undefined,undefined);
	        mockScope.$root.$digest();
	        expect(mockScope.currentRecPin.pinned).toBe(false);  
	        expect(mockScope.currentRecPin.pinning).toBe(false);	        

  		}));

	});

	//Suite for ListNewAttachments
	describe('ListNewAttachments', function() {

		it('should have a function to remove Local Attachment', inject(function ($controller) {

	        $controller('ListNewAttachments', {
	            $scope: mockScope,
	            AttachmentsService: mockAttachmentsService
	        });

	        expect(mockScope.removeLocalAttachment).toBeDefined();
	        mockAttachmentsService.updatedAttachments = mockStrataDataService.mockAttachments;
	        expect(mockAttachmentsService.updatedAttachments.length).toBe(2);	        
	        mockScope.removeLocalAttachment(1);	        
	        expect(mockAttachmentsService.updatedAttachments.length).toBe(1);       	        

  		}));

	});

	//Suite for EmailNotifySelect
	describe('EmailNotifySelect', function() {

		it('should have a function to update Notified Users resolved', inject(function ($controller) {

	        $controller('EmailNotifySelect', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	          	strataService: mockStrataService,
	          	EDIT_CASE_CONFIG: mockStrataDataService.value
	        });

	        expect(mockScope.updateNotifyUsers).toBeDefined();
	        mockCaseService.kase.case_number = '1234';
	        mockCaseService.originalNotifiedUsers = mockStrataDataService.mockOriginalNotifiedUsers;
	        mockCaseService.updatedNotifiedUsers = mockStrataDataService.mockUpdatedNotifiedUsers;	        
	        mockScope.updateNotifyUsers();
	        spyOn(mockStrataService.cases.notified_users, 'remove').andCallThrough();
	        spyOn(mockStrataService.cases.notified_users, 'add').andCallThrough();	        
	        mockScope.$root.$digest(); 
	        expect(mockScope.updatingList).toBe(false);
	        expect(mockCaseService.updatedNotifiedUsers).toEqual(mockCaseService.originalNotifiedUsers);       

  		}));

		it('should have a function to update Notified Users rejected', inject(function ($controller) {

	        $controller('EmailNotifySelect', {
	            $scope: mockScope,
	            CaseService: mockCaseService,
	          	strataService: mockStrataService,
	          	EDIT_CASE_CONFIG: mockStrataDataService.value
	        });

	        expect(mockScope.updateNotifyUsers).toBeDefined();
	        mockCaseService.kase.case_number = '1234';
	        mockCaseService.originalNotifiedUsers = mockStrataDataService.mockOriginalNotifiedUsers;
	        mockCaseService.updatedNotifiedUsers = mockStrataDataService.mockUpdatedNotifiedUsers;
	        mockStrataService.rejectCalls();
	        spyOn(mockStrataService.cases.notified_users, 'remove').andCallThrough();
	        spyOn(mockStrataService.cases.notified_users, 'add').andCallThrough();	        
	        mockScope.updateNotifyUsers();	        	        
	        mockScope.$root.$digest(); 
	        expect(mockScope.updatingList).toBe(false);
	        expect(mockCaseService.updatedNotifiedUsers).toEqual(mockStrataDataService.mockUpdatedNotifiedUsers);       

  		}));

	});
	
	
});